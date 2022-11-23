from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Story, Comment, User
from app.forms import LoginForm, SignUpForm, CommentForm, StoryForm
from app.api.auth_routes import validation_errors_to_error_messages

story_routes = Blueprint('stories', __name__)


##################### GET ALL STORIES #######################
@story_routes.route('/')
def stories():
    """
    Query for all stories and returns them in a list of user dictionaries
    """
    stories = Story.query.all()
    # stories = Story.query.order_by(Story.created_at.desc()).all()


    return jsonify({'stories': [story.to_dict() for story in stories]})


##################### POST A STORY #######################
@story_routes.route('/', methods=["POST"])
@login_required
def add_story():
    """
    Create new story and return it in a dictionary
    """

    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
      data = form.data
      new_story = Story(
          user_id = current_user.id,
          title = data['title'],
          content = data['content'],
          image = data['image'],
          created_at = data['createdAt']
          )
      db.session.add(new_story)
      db.session.commit()
      return jsonify(new_story.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


##################### GET STORY BY ID #######################
@story_routes.route('/<int:id>')
def story(id):
    """
    Query for a story by id and returns that story in a dictionary
    """
    story = Story.query.get(id)
    # return jsonify(story.to_dict(True))
    return jsonify(story.to_dict())


##################### EDIT STORY BY ID #######################
@story_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_story(id):
    """
    Query for a story by id, edits the story, and returns that story in a dictionary
    """
    story = Story.query.get(id)
    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        story.user_id = current_user.id
        story.title = data['title']
        story.content = data['content']
        story.image = data['image']
        story.created_at = data['createdAt']

        db.session.commit()
        return jsonify(story.to_dict())
    return jsonify('story not updated')
