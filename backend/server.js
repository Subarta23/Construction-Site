const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database(path.join(__dirname, "data.db"));
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      passwordHash TEXT,
      firstName TEXT,
      lastName TEXT,
      mobile TEXT,
      address TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      name TEXT,
      email TEXT,
      phone TEXT,
      projectType TEXT,
      message TEXT,
      createdAt TEXT,
      FOREIGN KEY(userId) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      message TEXT,
      createdAt TEXT
    )
  `);
});

app.use(express.json());
app.use(
  session({
    secret: "replace-with-a-strong-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/css", express.static(path.join(__dirname, "../css")));
app.use("/js", express.static(path.join(__dirname, "../js")));
app.use("/IMG", express.static(path.join(__dirname, "../IMG")));
app.use("/html", express.static(path.join(__dirname, "../html")));

app.get("/", (_, res) => res.redirect("/html/home.html"));

function requireAuth(req, res, next) {
  if (req.session.userId) return next();
  res.status(401).json({ error: "Not authenticated" });
}

app.post("/api/signup", async (req, res) => {
  const { username, password, firstName, lastName, mobile, address } = req.body;
  if (
    !username ||
    !password ||
    !firstName ||
    !lastName ||
    !mobile ||
    !address
  ) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    db.run(
      `INSERT INTO users
         (username,passwordHash,firstName,lastName,mobile,address)
       VALUES (?,?,?,?,?,?)`,
      [username, hash, firstName, lastName, mobile, address],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE")) {
            return res.status(409).json({ error: "Username taken" });
          }
          return res.status(500).json({ error: "DB error" });
        }
        req.session.userId = this.lastID;
        res.status(201).json({ message: "User created" });
      }
    );
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/signin", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username & password required" });
  }

  db.get(
    `SELECT id,passwordHash FROM users WHERE username = ?`,
    [username],
    async (err, row) => {
      if (err) return res.status(500).json({ error: "DB error" });
      if (!row) return res.status(401).json({ error: "Invalid credentials" });

      const match = await bcrypt.compare(password, row.passwordHash);
      if (!match) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = row.id;
      res.json({ message: "Logged in" });
    }
  );
});

app.get("/api/me", requireAuth, (req, res) => {
  const userId = req.session.userId;
  db.get(
    `SELECT username, firstName, lastName, mobile, address
       FROM users WHERE id = ?`,
    [userId],
    (err, row) => {
      if (err) return res.status(500).json({ error: "DB error" });
      if (!row) return res.status(404).json({ error: "User not found" });
      res.json(row);
    }
  );
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

app.post("/api/bookings", requireAuth, (req, res) => {
  const userId = req.session.userId;
  const { name, email, phone, projectType, message } = req.body;
  if (!name || !email || !phone || !projectType || !message) {
    return res.status(400).json({ error: "All fields required" });
  }

  const createdAt = new Date().toISOString();
  db.run(
    `INSERT INTO bookings
       (userId,name,email,phone,projectType,message,createdAt)
     VALUES (?,?,?,?,?,?,?)`,
    [userId, name, email, phone, projectType, message, createdAt],
    function (err) {
      if (err) return res.status(500).json({ error: "DB error" });
      db.get(
        `SELECT * FROM bookings WHERE id = ?`,
        [this.lastID],
        (err, row) => {
          if (err) return res.status(500).json({ error: "DB error" });
          res.status(201).json(row);
        }
      );
    }
  );
});

app.get("/api/bookings", requireAuth, (req, res) => {
  db.all(
    `SELECT * FROM bookings
       WHERE userId = ?
       ORDER BY datetime(createdAt) DESC`,
    [req.session.userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json(rows);
    }
  );
});

app.post("/api/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  console.log("Contact form payload:", req.body);

  if (!name || !email || !phone || !message) {
    console.log("Contact form validation failed");
    return res.status(400).json({ error: "All fields are required" });
  }

  const createdAt = new Date().toISOString();
  db.run(
    `INSERT INTO contacts
       (name,email,phone,message,createdAt)
     VALUES (?,?,?,?,?)`,
    [name, email, phone, message, createdAt],
    function (err) {
      if (err) {
        console.error("DB error inserting contact:", err);
        return res.status(500).json({ error: "DB error" });
      }
      console.log(`Inserted contact id=${this.lastID}`);

      db.get(
        `SELECT * FROM contacts WHERE id = ?`,
        [this.lastID],
        (err, row) => {
          if (err) {
            console.error("DB error fetching new contact:", err);
            return res.status(500).json({ error: "DB error" });
          }
          res.status(201).json(row);
        }
      );
    }
  );
});

app.get("/api/contacts", (req, res) => {
  db.all(
    `SELECT * FROM contacts ORDER BY datetime(createdAt) DESC`,
    (err, rows) => {
      if (err) {
        console.error("DB error fetching contacts:", err);
        return res.status(500).json({ error: "DB error" });
      }
      res.json(rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
