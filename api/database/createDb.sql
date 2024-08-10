CREATE TABLE "Users" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "password" TEXT,
    "email" TEXT,
    "date_of_birth" TEXT,
    "gender" TEXT
);
CREATE TABLE "Follows" (
    "follower_id" INTEGER,
    "followee_id" INTEGER,
    PRIMARY KEY ("follower_id", "followee_id"),
    FOREIGN KEY ("follower_id") REFERENCES "Users"("id"),
    FOREIGN KEY ("followee_id") REFERENCES "Users"("id")
);


CREATE TABLE "Posts" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "content" TEXT,
    "created_at" TEXT,
    FOREIGN KEY("user_id") REFERENCES "Users"("id")
);

CREATE TABLE "Images" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "post_id" INTEGER,
    "image_url" TEXT,
    FOREIGN KEY("post_id") REFERENCES "Posts"("id")
);

CREATE TABLE "Tags" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT UNIQUE
);

CREATE TABLE "PostTags" (
    "post_id" INTEGER,
    "tag_id" INTEGER,
    FOREIGN KEY("post_id") REFERENCES "Posts"("id"),
    FOREIGN KEY("tag_id") REFERENCES "Tags"("id"),
    PRIMARY KEY("post_id", "tag_id")
);

CREATE TABLE "Comments" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "post_id" INTEGER,
    "user_id" INTEGER,
    "content" TEXT,
    "created_at" TEXT,
    FOREIGN KEY("post_id") REFERENCES "Posts"("id"),
    FOREIGN KEY("user_id") REFERENCES "Users"("id")
);
CREATE TABLE "CommentReactions" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "comment_id" INTEGER,
    "user_id" INTEGER,
    "reaction_type_id" INTEGER,
    "created_at" TEXT,
    FOREIGN KEY("comment_id") REFERENCES "Comments"("id"),
    FOREIGN KEY("user_id") REFERENCES "Users"("id"),
    FOREIGN KEY("reaction_type_id") REFERENCES "ReactionType"("id")
);
CREATE TABLE "ReactionType" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT UNIQUE
);

CREATE TABLE "Reactions" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "post_id" INTEGER,
    "user_id" INTEGER,
    "reaction_type_id" INTEGER,
    "created_at" TEXT,
    FOREIGN KEY("post_id") REFERENCES "Posts"("id"),
    FOREIGN KEY("user_id") REFERENCES "Users"("id"),
    FOREIGN KEY("reaction_type_id") REFERENCES "ReactionType"("id")
);
CREATE TABLE "Notifications" (
	"id"	INTEGER,
	"username"	TEXT NOT NULL,
	"type"	TEXT NOT NULL,
	"isRead"	BOOLEAN DEFAULT 0,
	"createdAt"	TEXT,
	"actionuser"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE "Share" (
	"id"	INTEGER,
	"username"	TEXT,
	"usersharedto"	TEXT,
	"postid"	INTEGER,
	"createdAt"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);