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
        # story.user_id = current_user.id
        story.title = data['title']
        story.content = data['content']
        story.image = data['image']
        # story.created_at = data['createdAt']
        db.session.commit()
        return jsonify(story.to_dict())
    return jsonify('story not updated')


##################### DELETE STORY BY ID #######################
@story_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_story(id):
    """
    Deletes a story
    """
    story = Story.query.get(id)
    db.session.delete(story)
    db.session.commit()
    return jsonify('Story Deleted')



############## GET ALL STORIES BY CURRENT USER ################
@story_routes.route('/current')
@login_required
def current():
    stories = current_user.stories

    # return jsonify({'Stories': [story.to_dict(True) for story in stories]})
    #without True arg
    return jsonify({'Stories': [story.to_dict() for story in stories]})


################ COMMENTS ROUTES ###################

################ POST A COMMENT ####################
@story_routes.route('/<int:id>/comments', methods=["POST"])
@login_required
def add_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_comment = Comment(
            user_id=current_user.id,
            story_id=id,
            comment=data["comment"]
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.to_dict())
    return jsonify("Comment not added")


################ DELETE A COMMENT ####################
@story_routes.route('/<int:story_id>/comments/<int:comment_id>', methods=["DELETE"])
@login_required
def delete_comment(story_id, comment_id):
    """
    Deletes a comment
    """
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return jsonify('Comment Deleted')


################ EDIT A COMMENT ####################
@story_routes.route('/<int:story_id>/comments/<int:comment_id>', methods=["PUT"])
@login_required
def edit_comment(story_id, comment_id):
    """
    Query for a comment by id, edits the comment, and returns that comment in a dictionary
    """
    comment = Comment.query.get(comment_id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        comment.comment = data['comment']
        db.session.commit()
        return jsonify(comment.to_dict())
    return jsonify('Comment not updated')
