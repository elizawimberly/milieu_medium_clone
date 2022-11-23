from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


date_str = str(datetime.now())

class Story(db.Model):
  __tablename__ = 'stories'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(
    add_prefix_for_prod('users.id')), nullable=False)
  title = db.Column(db.String(400), nullable=False)
  content = db.Column(db.String, nullable=False)
  image = db.Column(db.String(1000), nullable=False)
  created_at = db.Column(db.String(50), nullable=False, default=date_str)

  user = db.relationship('User', back_populates='stories')

  comments = db.relationship('Comment',
                              back_populates='story',
                              cascade="all, delete-orphan"
                              )

  def to_dict(self):
    return {
        'id': self.id,
        'userId': self.user_id,
        'title': self.title,
        'content': self.content,
        'image': self.image,
        'createdAt': self.created_at,
        'User': self.user.to_dict(),
        'Comments': [comment.to_dict() for comment in self.comments]
    }
