from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Story, Comment, User
from app.forms import LoginForm, SignUpForm, CommentForm, StoryForm

story_routes = Blueprint('stories', __name__)

@story_routes.route('/')
def stories():
    """
    Query for all stories and returns them in a list of user dictionaries
    """
    stories = Story.query.all()
    # stories = Story.query.order_by(Story.created_at.desc()).all()

    # normalized
    # return { 'stories': { photo['id'] : photo.to_dict() for photo in stories} }

    # not normalized
    return jsonify({'stories': [story.to_dict() for story in stories]})
