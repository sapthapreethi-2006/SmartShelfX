# Registration Troubleshooting Guide

## ❌ Common Issues & Solutions

### Issue 1: "Registration failed" with 500 error

**Possible Causes:**

1. **Missing Required Fields**
   - Ensure JSON has: `username`, `password`, `role`
   - Example:
   ```json
   {
     "username": "john_admin",
     "password": "SecurePass123",
     "role": "ADMIN"
   }
   ```

2. **Username Already Exists**
   - You'll get 409 Conflict error
   - Try with a different username
   - Or delete from database and retry

3. **Invalid Endpoint URL**
   - ✅ Correct: `POST http://localhost:9191/invent/register`
   - ❌ Wrong: `POST http://localhost:9191/invent/`
   - ❌ Wrong: `POST http://localhost:9191/invent/login`

4. **Database Connection Issues**
   - Check MySQL is running: `mysql -u root -p`
   - Verify database exists: `SHOW DATABASES;`
   - Check application.properties has correct credentials

5. **Role Not Recognized**
   - Use one of: `ADMIN`, `MANAGER`, `VENDOR`
   - Case-sensitive!
   - ✅ `"role": "ADMIN"`
   - ❌ `"role": "admin"`
   - ❌ `"role": "Admin"`

### Issue 2: 409 Conflict - "Username already exists"

**Solution:**
- Use a different username
- Or delete existing user from database:
  ```sql
  DELETE FROM users WHERE username = 'john_admin';
  ```

### Issue 3: "Password is required" error

**Solution:**
- Make sure password field is in JSON
- Password cannot be empty
- Minimum recommendation: 8 characters

### Issue 4: Empty role field

**Solution:**
- Ensure role field is included in request
- Must be: `ADMIN`, `MANAGER`, or `VENDOR`

---

## ✅ Correct Request Examples

### cURL
```bash
curl -X POST http://localhost:9191/invent/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Password123",
    "role": "VENDOR"
  }'
```

### Postman
```
Method: POST
URL: http://localhost:9191/invent/register
Header: Content-Type: application/json

Body (JSON):
{
  "username": "john_doe",
  "password": "SecurePassword123",
  "role": "MANAGER"
}
```

### React/Axios
```javascript
const register = async () => {
  try {
    const response = await axios.post(
      'http://localhost:9191/invent/register',
      {
        username: 'newuser',
        password: 'MyPassword123',
        role: 'ADMIN'
      }
    );
    console.log('Success:', response.data);
    // response.data = { id: 1, message: "User registered successfully", role: "ADMIN" }
  } catch (error) {
    console.error('Error:', error.response?.data);
  }
};
```

---

## 🔍 Debug Checklist

Before registering, verify:

- [ ] MySQL is running
- [ ] Database `inventdb` exists
- [ ] Table `users` exists or will be auto-created
- [ ] Spring Boot application is running on port 9191
- [ ] Correct URL: `http://localhost:9191/invent/register`
- [ ] JSON is valid (no syntax errors)
- [ ] `username` is provided and not empty
- [ ] `password` is provided and not empty
- [ ] `role` is one of: ADMIN, MANAGER, VENDOR
- [ ] Content-Type header is `application/json`

---

## 📊 Expected Responses

### Success (201 Created)
```json
{
  "id": 1,
  "message": "User registered successfully",
  "role": "ADMIN"
}
```

### Username Exists (409 Conflict)
```json
{
  "error": "Username already exists"
}
```

### Missing Field (400 Bad Request)
```json
{
  "error": "Username is required"
}
```

### Server Error (500 Internal Server Error)
```json
{
  "error": "Registration failed: [error message]",
  "details": "[exception class]"
}
```

---

## 🛠️ How to Check Database

### Login to MySQL
```bash
mysql -u root -p
```

### Check if table exists
```sql
USE inventdb;
SHOW TABLES;
DESC users;
```

### View registered users
```sql
SELECT id, username, role FROM users;
```

### Delete a user (if needed)
```sql
DELETE FROM users WHERE username = 'testuser';
```

---

## 🚀 Quick Test

1. **Start application:**
   ```bash
   mvn spring-boot:run
   ```

2. **Register user:**
   ```bash
   curl -X POST http://localhost:9191/invent/register \
     -H "Content-Type: application/json" \
     -d '{"username":"test1","password":"Pass123","role":"ADMIN"}'
   ```

3. **Check response:**
   - Should see: `{"id":1,"message":"User registered successfully","role":"ADMIN"}`

4. **Verify in database:**
   ```sql
   SELECT * FROM users WHERE username = 'test1';
   ```

---

## 📞 If Still Having Issues

1. Check application logs for full error message
2. Verify MySQL credentials in `application.properties`
3. Make sure `spring.jpa.hibernate.ddl-auto=update` is set
4. Restart Spring Boot application
5. Clear browser cache if using frontend
6. Try different username (no special characters)

