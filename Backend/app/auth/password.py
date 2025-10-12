import bcrypt

def hash_pass(password: str) -> str:
    """Hash a password using bcrypt. Truncates password to 72 bytes if necessary."""
    # Ensure password doesn't exceed bcrypt's 72-byte limit
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        # Truncate to 72 bytes
        password_bytes = password_bytes[:72]
    
    # Generate salt and hash the password
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed.decode('utf-8')

def verify_pass(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash. Truncates password to 72 bytes if necessary."""
    # Apply the same truncation logic as in hash_pass
    password_bytes = plain_password.encode('utf-8')
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
        
    # Convert hash back to bytes for verification
    hashed_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hashed_bytes)