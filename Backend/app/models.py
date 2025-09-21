from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func 
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    diagrams = relationship("Diagram", back_populates="owner", cascade="all, delete-orphan")

class Diagram(Base):
    __tablename__ = "diagrams"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    plantuml_code = Column(Text, nullable=False)
    svg_content = Column(Text)  # Nullable in case rendering fails initially
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    owner = relationship("User", back_populates="diagrams")
    chat_messages = relationship("ChatHistory", back_populates="diagram", cascade="all, delete-orphan", order_by="ChatHistory.created_at")

    # Simple index for user's diagrams
    __table_args__ = (
        Index('idx_owner_created', 'owner_id', 'created_at'),
    )

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    diagram_id = Column(Integer, ForeignKey("diagrams.id", ondelete="CASCADE"), nullable=False, index=True)
    user_message = Column(Text, nullable=False)
    ai_response = Column(Text, nullable=False)
    message_order = Column(Integer, nullable=False)  # Track conversation order
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationships
    diagram = relationship("Diagram", back_populates="chat_messages")

    # Index for conversation ordering
    __table_args__ = (
        Index('idx_diagram_order', 'diagram_id', 'message_order'),
    )
