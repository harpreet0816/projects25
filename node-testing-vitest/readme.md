# ✅ Vitest with Deep Mocking using vitest-mock-extended

This project demonstrates **unit testing** in a TypeScript/JavaScript environment using **[Vitest](https://vitest.dev/)** and **deep mocking** via **[vitest-mock-extended](https://github.com/vercel/vitest-mock-extended)**.

---

## 📘 What is Vitest?

**Vitest** is a modern, blazing-fast unit testing framework built by the creators of Vite. It’s designed to work seamlessly in Vite-powered applications, but can be used standalone too.

### 🌟 Key Features:
- Super fast and Vite-native
- Built-in mocking and snapshot support
- First-class TypeScript support
- Runs in watch mode with instant feedback

---

## 🧠 What is Deep Mocking?

### ✅ Regular mocking:
You create manual or shallow mocks — you only mock top-level methods.

### ✅ Deep mocking:
You automatically mock **nested structures**, including:
- Chained methods (e.g., `db.user.find().populate()`)
- Properties that return functions
- Deep object trees (like services calling repositories calling DB clients)

### 🔥 Why use `vitest-mock-extended`?
- Reduces boilerplate
- Ensures type safety
- Easy to mock complex or nested interfaces
- Maintained and community-trusted

---

## 📦 Installation

Install Vitest:

```bash
npm install -D vitest
```

Install the vitest-mock-extended library:
```bash
npm install -D vitest-mock-extended
```
