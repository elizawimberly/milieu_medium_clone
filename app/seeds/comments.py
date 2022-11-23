from app.models import db, User, Story, Comment, environment, SCHEMA

def seed_comments():
  comment1 = Comment(
    user_id= 1,
    story_id = 1,
    comment = 'Semiotics bitters DIY small batch, godard freegan PBR&B party',
    created_at = '2022-05-11 02:54:26'
    )

  comment2 = Comment(
    user_id= 1,
    story_id = 2,
    comment = 'Banh mi 90 flannel',
    created_at = '2021-05-11 02:54:26'
    )

  comment3 = Comment(
    user_id= 1,
    story_id = 3,
    comment = 'Next level fixie irony four loko meditation, tbh tumblr',
    created_at = '2022-07-11 02:54:26'
    )

  comment4 = Comment(
    user_id= 1,
    story_id = 4,
    comment = 'Air plant locavore meditation flexitarian next level portland pour-over cardigan keytar',
    created_at = '2020-07-11 02:54:26'
    )

  comment5 = Comment(
    user_id= 1,
    story_id = 5,
    comment = 'Master cleanse brunch, pitchfork cliche jean shorts edison',
    created_at = '2022-07-11 02:54:26'
    )

  comment6 = Comment(
    user_id= 1,
    story_id = 6,
    comment = "I'm baby umami viral vegan kombucha artisan tumblr flexitarian pour-over sriracha kitsch",
    created_at = '2022-07-10 02:54:26'
    )

  comment7 = Comment(
    user_id= 1,
    story_id = 7,
    comment = 'Direct trade poutine authentic, aesthetic gentrify polaroid vegan four loko yr shoreditch',
    created_at = '2022-07-21 02:54:26'
    )

  comment8 = Comment(
    user_id= 1,
    story_id = 8,
    comment = 'Brooklyn bicycle rights kombucha authentic',
    created_at = '2022-07-12 02:54:26'
    )


  comment9 = Comment(
    user_id= 1,
    story_id = 9,
    comment = 'williamsburg copper hell of affogato woke authentic raclette mixtape literally distillery pok pok',
    created_at = '2022-08-11 02:54:26'
    )


  comment10 = Comment(
    user_id= 1,
    story_id = 10,
    comment = 'Semiotics bitters small batch, godard freegan PBR&B roof party williamsburg',
    created_at = '2021-09-11 02:54:26'
    )

  comment11 = Comment(
    user_id= 2,
    story_id = 1,
    comment = 'Adaptogen four loko sustainable, pug fit stumptown meggings bodega boys',
    created_at = '2021-08-11 02:54:26'
    )

  comment1 = Comment(
    user_id= 2,
    story_id = 1,
    comment = 'Tumblr copper mug sustainable vibecession',
    created_at = '2020-08-11 02:54:26'
    )

  comment12 = Comment(
    user_id= 1,
    story_id = 1,
    comment = 'Flannel +1 yuccie, celiac etsy schlitz coloring book four loko cray bruh woke',
    created_at = '2019-08-11 02:54:26'
    )

  comment13 = Comment(
    user_id= 2,
    story_id = 3,
    comment = 'Tumblr copper mug sustainable vibecession.',
    created_at = '2022-10-12 02:54:26'
    )

  comment14 = Comment(
    user_id= 2,
    story_id = 4,
    comment = ' Twee 8-bit prism banh mi. Mixtape iPhone glossier, af scenester bicycle rights listicle bruh tumblr gatekeep unicorn',
    created_at = '2021-07-11 02:54:26'
    )

  comment15 = Comment(
    user_id= 2,
    story_id = 5,
    comment = 'Next level fixie irony four loko meditation, tbh tumblr',
    created_at = '2020-10-11 02:54:26'
    )

  comment16 = Comment(
    user_id= 2,
    story_id = 5,
    comment = 'Typewriter chambray PBR&B poutine.',
    created_at = '2019-11-12 02:54:26'
    )

  comment17 = Comment(
    user_id= 2,
    story_id = 6,
    comment = 'Mumblecore trust fund sartorial 3 wolf moon scenester ennui gentrify bespoke iPhone yuccie raw denim Brooklyn.',
    created_at = '2020-08-11 02:54:26'
    )

  comment18 = Comment(
    user_id= 2,
    story_id = 7,
    comment = 'Venmo meggings heirloom',
    created_at = '2021-10-11 02:54:26'
    )

  comment19 = Comment(
    user_id= 2,
    story_id = 8,
    comment = 'unicorn williamsburg copper mug enamel pin',
    created_at = '2020-03-01 02:54:26'
    )

  comment1 = Comment(
    user_id= 2,
    story_id = 9,
    comment = 'Air plant locavore flannel meditation flexitarian next level portland pour-over',
    created_at = '2022-10-21 02:54:26'
    )

  comment20 = Comment(
    user_id= 2,
    story_id = 10,
    comment = 'cardigan keytar post-ironic palo santo',
    created_at = '2021-02-20 02:54:26'
    )


  comment21 = Comment(
    user_id= 3,
    story_id = 1,
    comment = 'fingerstache literally street art',
    created_at = '2019-01-05 02:54:26'
    )


  comment22 = Comment(
    user_id= 3,
    story_id = 1,
    comment = 'Cred letterpress chillwave',
    created_at = '2020-05-18 02:54:26'
    )


  comment23 = Comment(
    user_id= 3,
    story_id = 2,
    comment = 'yr pok pok affogato small batch tousled freegan hexagon',
    created_at = '2019-01-21 02:54:26'
    )


  comment24 = Comment(
    user_id= 3,
    story_id = 2,
    comment = 'Biodiesel blue bottle locavore',
    created_at = '2020-03-11 02:54:26'
    )


  comment25 = Comment(
    user_id= 3,
    story_id = 2,
    comment = 'bicycle rights, whatever cold-pressed',
    created_at = '2022-02-01 02:54:26'
    )


  comment26 = Comment(
    user_id= 3,
    story_id = 4,
    comment = 'chia bespoke jianbing kogi letterpress selvage intelligentsia',
    created_at = '2021-03-11 02:54:26'
    )

  comment27 = Comment(
    user_id= 3,
    story_id = 5,
    comment = 'Cred letterpress chillwave wayfarers',
    created_at = '2022-01-13 02:54:26'
    )

  comment28 = Comment(
    user_id= 3,
    story_id = 6,
    comment = 'Brooklyn bicycle rights kombucha shoreditch',
    created_at = '2020-01-28 02:54:26'
    )


  comment29 = Comment(
    user_id= 3,
    story_id = 7,
    comment = 'aesthetic gentrify polaroid vegan four loko yr shoreditch',
    created_at = '2019-01-21 02:54:26'
    )


  comment30 = Comment(
    user_id= 3,
    story_id = 8,
    comment = 'craft beer woke gatekeep polaroid drinking vinegar marfa',
    created_at = '2018-02-14 02:54:26'
    )


  comment31 = Comment(
    user_id= 3,
    story_id = 9,
    comment = 'Coloring book mustache sartorial viral PBR&B neutra',
    created_at = '2022-01-21 02:54:26'
    )


  comment32 = Comment(
    user_id= 3,
    story_id = 10,
    comment = 'Twee 8-bit prism sartorial',
    created_at = '2018-06-20 02:54:26'
    )


  comment33 = Comment(
    user_id= 1,
    story_id = 1,
    comment = 'Pok pok salvia 3 wolf moon kombucha',
    created_at = '2019-01-02 02:54:26'
    )


  comment34 = Comment(
    user_id= 1,
    story_id = 2,
    comment = 'Brooklyn bicycle rights authentic',
    created_at = '2022-01-21 02:54:26'
    )


  comment35 = Comment(
    user_id= 1,
    story_id = 3,
    comment = 'Same try-hard gochujang bushwick',
    created_at = '2020-03-10 02:54:26'
    )

  comment36 = Comment(
    user_id= 1,
    story_id = 4,
    comment = 'williamsburg raclette',
    created_at = '2022-03-11 02:54:26'
    )

  comment37 = Comment(
    user_id= 1,
    story_id = 5,
    comment = 'Air plant locavore flannel',
    created_at = '2018-03-07 02:54:26'
    )


  comment38 = Comment(
    user_id= 1,
    story_id = 6,
    comment = 'meditation flexitarian next level portland keytar',
    created_at = '2020-02-28 02:54:26'
    )


  comment39 = Comment(
    user_id= 1,
    story_id = 7,
    comment = 'pour-over cardigan post-ironic palo santo',
    created_at = '2019-07-19 02:54:26'
    )


  comment40 = Comment(
    user_id= 1,
    story_id = 8,
    comment = 'fingerstache literally street art',
    created_at = '2021-03-11 02:54:26'
    )


  comment41 = Comment(
    user_id= 1,
    story_id = 9,
    comment = 'Activated charcoal vape mumblecore etsy four loko viral',
    created_at = '2019-02-21 02:54:26'
    )


  comment42 = Comment(
    user_id= 1,
    story_id = 10,
    comment = 'Fashion axe tbh',
    created_at = '2022-02-01 02:54:26'
    )


  comment43 = Comment(
    user_id= 2,
    story_id = 1,
    comment = 'Cred letterpress chillwave',
    created_at = '2021-05-21 02:54:26'
    )


  comment44 = Comment(
    user_id= 2,
    story_id = 2,
    comment = 'yr pok pok affogato small batch tousled freegan hexagon',
    created_at = '2020-08-19 02:54:26'
    )


  comment45 = Comment(
    user_id= 2,
    story_id = 3,
    comment = '3 wolf moon actually franzen edison flexitarian',
    created_at = '2019-04-21 02:54:26'
    )


  comment46 = Comment(
    user_id= 2,
    story_id = 4,
    comment = 'hella chillwave craft beer subway tile four dollar',
    created_at = '2019-03-22 02:54:26'
    )


  comment47 = Comment(
    user_id= 2,
    story_id = 5,
    comment = 'locavore whatever cold-pressed chia bespoke kogi',
    created_at = '2020-01-04 02:54:26'
    )

  comment48 = Comment(
    user_id= 2,
    story_id = 6,
    comment = 'jianbing wayfarers letterpress selvage intelligentsia',
    created_at = '2019-05-05 02:54:26'
    )


  comment49 = Comment(
    user_id= 2,
    story_id = 7,
    comment = 'craft beer subway tile four',
    created_at = '2021-07-14 02:54:26'
    )


  comment50 = Comment(
    user_id= 2,
    story_id = 8,
    comment = 'dollar toast banh mi',
    created_at = '2021-06-16 02:54:26'
    )

  all_comments = [
    comment1,
    comment2,
    comment3,
    comment4,
    comment5,
    comment6,
    comment7,
    comment8,
    comment9,
    comment10,
    comment11,
    comment12,
    comment13,
    comment14,
    comment15,
    comment16,
    comment17,
    comment18,
    comment19,
    comment20,
    comment21,
    comment22,
    comment23,
    comment24,
    comment25,
    comment26,
    comment27,
    comment28,
    comment29,
    comment30,
    comment31,
    comment32,
    comment33,
    comment34,
    comment35,
    comment36,
    comment37,
    comment38,
    comment39,
    comment40,
    comment41,
    comment42,
    comment43,
    comment44,
    comment45,
    comment46,
    comment47,
    comment48,
    comment49,
    comment50
  ]

  saved_comments = [db.session.add(comment) for comment in all_comments]
  db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
