---
title: How I build my own instagram with Java SpringBoot
public: false
description: "A journey of learning java SpringBoot, start with building a common app: Instagram"
date: 2025-04-11
tags:
  - SpringBoot
  - React
  - SystemDesign
---

## Prepare database

First thing first, design database is one of the most important step. We need to clarify what exactly Instagram will have.

Let start with functional and non-function requirements of them:
+ Functional Requirement:
	+ The user can login, logout, register.
	+ The user can create new post (with the image and caption)
	+ The user can comment into another user's post
	+ The user can favorite your post, anyone has followed this user can see their post and interact with them
	+ The user follow another user and vice versa
	+ After someone interact with post (like, comment), we need to send a notification to the author (we will implement this feature later)
+ Non-function requirements
	+ This app can handle 500 user upload image at the same time
	+ The image should take less than 1ms-5ms for loading

With this feature we have listed, we can draw an ERD diagram for this:

![instagram-erd](instagram-erd.png)

## Start with building entity

#### UserEntity

#### PostEntity

#### CommentEntity

#### BaseEntity

#### FavoriteEntity

#### FollowEntity


### API Contract
Let define API contract to make sure everything work smoothly from frontend to backend.

#### 📌 Authentication

**POST /auth/login**

+ Request
```json
{
	email: "khanhvo198.y2k@gmail.com",
	password: "123456789"
}
```

+ Response
```json
{
	token: "123123123131231313123123123123123123",
	user: {
		id: "1231231233",
		email: "khanhvo198.y2k@gmail.com",
		username: "MyStic",
		bio: "123123123123213",
		avatarUrl: "https://example.com/avatat-url.png"
	}
}
```



**POST /auth/register**

+ Request
```json
{
	email: "khanhvo198.y2k@gmail.com",
	username: "MyStic",
	password: "123123123"
}
```


+ Response
```json
{
	token: "123123123123123123123123123123123123",
	user: {
		id: "1231231233",
		email: "khanhvo198.y2k@gmail.com",
		username: "MyStic",
		bio: "123123123123213",
		avatarUrl: "https://example.com/avatat-url.png"
	}
}
```

#### 👤User

**GET /users/me**

+ Headers:  
	+ `Authorization: Bearer <token>`

+ Response
```json
{
	user: {
		id: "1231231233",
		email: "khanhvo198.y2k@gmail.com",
		username: "MyStic",
		bio: "123123123123213",
		avatarUrl: "https://example.com/avatat-url.png"
	}
}
```


**GET /users/{userId}**

+ Response
```json
{
	user: {
		id: "1231231233",
		email: "khanhvo198.y2k@gmail.com",
		username: "MyStic",
		bio: "123123123123213",
		avatarUrl: "https://example.com/avatat-url.png"
	}
}
```


#### 📝Post

**GET /posts?author=MyStic&limit=20&offset=0**

Get all post who following by current user

+ Response
```json
{
	posts: [
		{
			id: "123123123213",
			content: "asasdasdasd",
			images: ["example1.png", "example2.png", "example3.png"],
			author: {
				id: "1231231233",
				email: "khanhvo198.y2k@gmail.com",
				username: "MyStic",
				bio: "123123123123213",
				avatarUrl: "https://example.com/avatat-url.png"
			},
			createdAt: "2024-01-01",
			updatedAt: "2024-01-01"
		},
		{
			id: "123123123213",
			content: "asasdasdasd",
			images: ["example1.png", "example2.png", "example3.png"],
			author: {
				id: "1231231233",
				email: "khanhvo198.y2k@gmail.com",
				username: "MyStic",
				bio: "123123123123213",
				avatarUrl: "https://example.com/avatat-url.png"
			},
			createdAt: "2024-01-01",
			updatedAt: "2024-01-01"
		}
	],
	postCount: 2
}
```



**POST /posts**

+ Headers:  
	+ `Authorization: Bearer <token>`

+ Request
```json
{
	post: {
		content: "aasdasdasd",
		images: ["example1.png", "example2.png", "example3.png"],
	}
}
```

+ Response
```json
{
	post: {
		id: "123123123213",
		content: "asasdasdasd",
		images: ["example1.png", "example2.png", "example3.png"],
		author: {
			id: "1231231233",
			email: "khanhvo198.y2k@gmail.com",
			username: "MyStic",
			bio: "123123123123213",
			avatarUrl: "https://example.com/avatat-url.png"
		},
		createdAt: "2024-01-01",
		updatedAt: "2024-01-01"
	}
}
```


**PUT /posts/{postId}**

+ Headers:  
	+ `Authorization: Bearer <token>`

+ Request
```json
{
	post: {
		content: "asdasdasdasdasd",
		images: ["example2.png", "example3.png", "example4.png"]
	}
}

```

+ Response
```json
{
	post: {
		id: "123123123213",
		content: "asasdasdasd",
		images: ["example2.png", "example3.png", "example4.png"],
		author: {
			id: "1231231233",
			email: "khanhvo198.y2k@gmail.com",
			username: "MyStic",
			bio: "123123123123213",
			avatarUrl: "https://example.com/avatat-url.png"
		},
		createdAt: "2024-01-01",
		updatedAt: "2024-01-01"
	}
}

```


**DELETE /posts/{postId}**

+ Headers:  
	+ `Authorization: Bearer <token>`

+ Response: No response anything, if success return with httpStatus 200

#### 💬 Comment

**GET /posts/{postId}/comments**
+ Response

```json
{
	comments: [
		{
			id: "123123123123",
			content: "nice!!!",
			createdAt: "2024-01-01",
			updatedAt: "2024-01-01",
			author: {
				id: "1231231233",
				email: "khanhvo198.y2k@gmail.com",
				username: "MyStic",
				bio: "123123123123213",
				avatarUrl: "https://example.com/avatat-url.png"
			},
			postId: "12312313123"
		},
		{
			id: "123123123123",
			content: "nice!!!",
			createdAt: "2024-01-01",
			updatedAt: "2024-01-01",
			author: {
				id: "1231231233",
				email: "khanhvo198.y2k@gmail.com",
				username: "MyStic",
				bio: "123123123123213",
				avatarUrl: "https://example.com/avatat-url.png"
			},
			postId: "12312313123"
		}
	],
	commentCount: 2
}
```



**POST /posts/{postId}/comments** 

+ Headers:  
	+ `Authorization: Bearer <token>`

+ Request
```json
{
	comment: {
		content: "nice!!!"
	}
}
```

+ Response

```json
{
	comment: {
		id: "123123123123",
		content: "nice!!!",
		createdAt: "2024-01-01",
		updatedAt: "2024-01-01",
		author: {
			id: "1231231233",
			email: "khanhvo198.y2k@gmail.com",
			username: "MyStic",
			bio: "123123123123213",
			avatarUrl: "https://example.com/avatat-url.png"
		}
	}
}
```


**PUT /posts/{postId}/comments/{commentId}** 

+ Headers:  
	+ `Authorization: Bearer <token>`

+ Request

```json
{
	comment: {
		content: "I change the comment"
	}
}
```

+ Response

```json
{
	comment: {
		id: "123123123123",
		content: "I change the comment",
		createdAt: "2024-01-01",
		updatedAt: "2024-01-02",
		author: {
			id: "1231231233",
			email: "khanhvo198.y2k@gmail.com",
			username: "MyStic",
			bio: "123123123123213",
			avatarUrl: "https://example.com/avatat-url.png"
		}
	}
}
```

**DELETE /posts/{postId}/comments/{commentId}** 
+ Headers:  
	+ `Authorization: Bearer <token>`

+ Response: No response anything, if success return with httpStatus 200


#### ❤️ Like

**POST /posts/{postId}/likes**

+ Response

```json
{
	message: "Like post successfully"
}
```

**DELETE /posts/{postId}/likes**

+ Response
```json
{
	message: "Unlike post successfully"
}
```

#### 👥 Follow

**POST /users/{userId}/follow**

+ Headers:  
	+ `Authorization: Bearer <token>`

+ Response: No response anything, if success return with httpStatus 200

**DELETE /users/{userId}/follow**

+ Headers:  
	+ `Authorization: Bearer <token>`

+ Response: No response anything, if success return with httpStatus 200



Create new Post
=> add image, add content (into temp folder of firebase), when drop image, push it into cloud and return url
=> call create post => insert image into database

Update Post
=> when user delete image => delete this from the image list store in front end (not delete the image on cloud storage)
=> when user drag new image => immediately upload into firebase
=> when user press create post button => compare images list before and after, detect whether image is changed, remove and add new image into Image table

+ In case of user cancel while editing the post => because we using the temp folder => we can write a cron job for deleting redundant data

Delete Post
=> delete post, image ...