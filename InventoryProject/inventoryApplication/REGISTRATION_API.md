# User Registration & Login API

## Endpoints

### 1. Register User
**Endpoint:** `POST /invent/register`

**Request Body:**
```json
{
  "username": "john_admin",
  "password": "SecurePass123",
  "role": "ADMIN"
}
```

**Success Response (201 Created):**
```json
{
  "id": 1,
  "message": "User registered successfully",
  "role": "ADMIN"
}
```

**Error Response - Username Exists (409 Conflict):**
```json
{
  "error": "Username already exists"
}
```

**Error Response (500):**
```json
{
  "error": "Registration failed: [error details]"
}
```

---

### 2. User Login
**Endpoint:** `POST /invent/login`

**Request Body:**
```json
{
  "username": "john_admin",
  "password": "SecurePass123"
}
```

**Success Response (200 OK):**
```json
{
  "role": "ADMIN"
}
```

**Error Response - Invalid Credentials (401 Unauthorized):**
```json
{
  "role": "false",
  "message": "Invalid username or password"
}
```

---

## Available Roles
- `ADMIN` - Administrator
- `MANAGER` - Manager
- `VENDOR` - Vendor

---

## cURL Examples

### Register
```bash
curl -X POST http://localhost:9191/invent/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Pass123",
    "role": "VENDOR"
  }'
```

### Login
```bash
curl -X POST http://localhost:9191/invent/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Pass123"
  }'
```

---

## React/Axios Example

### Register
```javascript
const handleRegister = async (username, password, role) => {
  try {
    const response = await axios.post('http://localhost:9191/invent/register', {
      username,
      password,
      role
    });
    alert('Registration successful!');
    navigate('/login');
  } catch (error) {
    alert(error.response?.data?.error || 'Registration failed');
  }
};
```

### Login
```javascript
const handleLogin = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:9191/invent/login', {
      username,
      password
    });
    
    const { role } = response.data;
    localStorage.setItem('userRole', role);
    
    // Route based on role
    if (role === 'ADMIN') navigate('/admin');
    else if (role === 'MANAGER') navigate('/manager');
    else if (role === 'VENDOR') navigate('/vendor');
    
  } catch (error) {
    alert('Invalid credentials');
  }
};
```

---

## Database

**Table:** `users` (auto-created by Hibernate)

Columns:
- `id` (BIGINT, AUTO_INCREMENT, PRIMARY KEY)
- `username` (VARCHAR, UNIQUE)
- `password` (VARCHAR, encrypted with BCrypt)
- `role` (VARCHAR)
- `email` (VARCHAR)
- `name` (VARCHAR)

---

## Key Features
✅ Password encrypted with BCrypt  
✅ Username uniqueness validation  
✅ Role-based return for frontend routing  
✅ Error handling with proper HTTP status codes  
✅ CORS enabled for React frontend  
✅ Direct database access via repository  

---

## Files Modified
- `LoginController.java` - Added `/register` and updated `/login` endpoints
- `InventoryUserRepository.java` - Already has `findByUsername()` and `existsByUsername()`
- `InventoryUser.java` - No changes needed

---

## Notes
- Passwords are automatically encoded with BCrypt before saving
- Existing code is commented out for backward compatibility
- Frontend handles role-based redirection after login
