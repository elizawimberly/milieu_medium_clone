from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, date


date_str = str(datetime.now())

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id =  db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')), nullable=False)
    comment = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.String(50), nullable=False, default=date_str)

    user = db.relationship('User', back_populates='comments')

    story = db.relationship('Story', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'storyId': self.story_id,
            'comment': self.comment,
            'createdAt': self.created_at,
            'User': self.user.to_dict(),
        }
