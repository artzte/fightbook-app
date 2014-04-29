module.exports = function(server) {

  // Create an API namespace, so that the root does not 
  // have to be repeated for each end point.
	server.namespace('/api', function() {

		// Return fixture data for '/api/posts/:id'
		server.get('/treatises', function(req, res) {
			var treatises = {
				  "treatises": [
				    {
				      "title": "Fior di battaglia",
				      "key": "fdb",
				      "author": "Fiore de Liberi",
				      "_id": "534b75b0b6b44d7e40d6797b",
				      "__v": 0,
				      "visibility": "authenticated",
				      "state": "draft",
				      "createdAt": "2014-04-14T05:44:16.705Z"
				    }
				  ]
				};

			res.send(treatises);
		});

		server.get('/treatises/534b75b0b6b44d7e40d6797b', function(req, res) {
			var treatise = {
			  "treatise": {
			    "title": "Fior di battaglia",
			    "key": "fdb",
			    "author": "Fiore de Liberi",
			    "_id": "534b75b0b6b44d7e40d6797b",
			    "__v": 0,
			    "visibility": "authenticated",
			    "state": "draft",
			    "createdAt": "2014-04-14T05:44:16.705Z",
			    "pages": [
			      "534b75b0b6b44d7e40d67983",
			      "534b75b0b6b44d7e40d67988",
					]
				},
				"pages": [
			    {
			      "slug": "6-verso",
			      "title": "6 Verso",
			      "author": "534b75b0b6b44d7e40d67979",
			      "treatise": "534b75b0b6b44d7e40d6797b",
			      "dziPath": "getty-dz/folio-06v.dzi",
			      "sortOrder": 4,
			      "_id": "534b75b0b6b44d7e40d67983",
			      "__v": 0,
			      "visibility": "authenticated",
			      "createdAt": "2014-04-14T05:44:16.729Z",
			      "index": 4,
			      "state": "draft"
			    },
			    {
			      "slug": "7-recto",
			      "title": "7 Recto",
			      "author": "534b75b0b6b44d7e40d67979",
			      "treatise": "534b75b0b6b44d7e40d6797b",
			      "dziPath": "getty-dz/folio-07.dzi",
			      "sortOrder": 5,
			      "_id": "534b75b0b6b44d7e40d67988",
			      "__v": 0,
			      "visibility": "authenticated",
			      "createdAt": "2014-04-14T05:44:16.737Z",
			      "index": 5,
			      "state": "draft"
			    }
			  ]
			};
			res.send(treatise);
		});

		server.get('/pages/534b75b0b6b44d7e40d67983', function(req, res) {
			var page = {
					  "page": {
					    "slug": "6-verso",
					    "title": "6 Verso",
					    "author": "534b75b0b6b44d7e40d67979",
					    "treatise": "534b75b0b6b44d7e40d6797b",
					    "dziPath": "getty-dz/folio-06v.dzi",
					    "sortOrder": 4,
					    "_id": "534b75b0b6b44d7e40d67983",
					    "__v": 0,
					    "visibility": "authenticated",
					    "createdAt": "2014-04-14T05:44:16.729Z",
					    "index": 4,
					    "state": "draft",
					    "sections": [
					      "534b75b0b6b44d7e40d67984",
					      "534b75b0b6b44d7e40d67985",
					      "534b75b0b6b44d7e40d67986",
					      "534b75b0b6b44d7e40d67987"
					    ]
					  },
					  "sections": [
					    {
					      "slug": "534b75b0b6b44d7e40d67984",
					      "author": "534b75b0b6b44d7e40d67979",
					      "page": "534b75b0b6b44d7e40d67983",
					      "sortOrder": 1,
					      "_id": "534b75b0b6b44d7e40d67984",
					      "__v": 0,
					      "translation": {
					        "md": "This is the first play of abrazare. Every guard of abrazare can be used to come to this play or grapple. Use your left hand to grip the opponent’s right arm at the bend of the elbow, and place your right arm straight past his left elbow. Then, immediately execute the grapple of the second play, i.e., grab him and give a volta to the body as shown. This will either put him to the ground or dislocate his arm.",
					        "html": "<p>This is the first play of abrazare. Every guard of abrazare can be used to come to this play or grapple. Use your left hand to grip the opponent’s right arm at the bend of the elbow, and place your right arm straight past his left elbow. Then, immediately execute the grapple of the second play, i.e., grab him and give a volta to the body as shown. This will either put him to the ground or dislocate his arm.</p>\n"
					      },
					      "bounds": {
					        "x": 1,
					        "y": 1,
					        "width": 0.5,
					        "height": 0.5
					      },
					      "createdAt": "2014-04-14T05:44:16.731Z",
					      "index": 0,
					      "state": "draft"
					    },
					    {
					      "slug": "534b75b0b6b44d7e40d67985",
					      "author": "534b75b0b6b44d7e40d67979",
					      "page": "534b75b0b6b44d7e40d67983",
					      "sortOrder": 2,
					      "_id": "534b75b0b6b44d7e40d67985",
					      "__v": 0,
					      "translation": {
					        "md": "As the student of the first Master, I’m sure to either throw this man to the ground or break or dislocate his left arm. If the opponent going against the first Master tries to free his hand from the Master’s shoulder to perform a different defense, I take the Master’s place and do the following. I immediately let go of the opponent’s arm with my left hand and use it to grab his left leg while placing my right hand under his throat to put him to the ground. You will see this in the third play.",
					        "html": "<p>As the student of the first Master, I’m sure to either throw this man to the ground or break or dislocate his left arm. If the opponent going against the first Master tries to free his hand from the Master’s shoulder to perform a different defense, I take the Master’s place and do the following. I immediately let go of the opponent’s arm with my left hand and use it to grab his left leg while placing my right hand under his throat to put him to the ground. You will see this in the third play.</p>\n"
					      },
					      "bounds": {
					        "x": 0,
					        "y": 0,
					        "width": 0.5,
					        "height": 0.5
					      },
					      "createdAt": "2014-04-14T05:44:16.732Z",
					      "index": 0,
					      "state": "draft"
					    },
					    {
					      "slug": "534b75b0b6b44d7e40d67986",
					      "author": "534b75b0b6b44d7e40d67979",
					      "page": "534b75b0b6b44d7e40d67983",
					      "sortOrder": 3,
					      "_id": "534b75b0b6b44d7e40d67986",
					      "__v": 0,
					      "translation": {
					        "md": "What the student has just said of me is the truth. From his grapple, I have just switched to this one to throw the opponent to the ground or dislocate his left arm. If the opponent took his left hand away from the Master’s shoulder, the Master would arrive at the third play as shown. So, with the first play and the second (which is one of his plays), the Master would send the opponent to the ground on his face; with the third play, the opponent would hit the ground on his back.",
					        "html": "<p>What the student has just said of me is the truth. From his grapple, I have just switched to this one to throw the opponent to the ground or dislocate his left arm. If the opponent took his left hand away from the Master’s shoulder, the Master would arrive at the third play as shown. So, with the first play and the second (which is one of his plays), the Master would send the opponent to the ground on his face; with the third play, the opponent would hit the ground on his back.</p>\n"
					      },
					      "bounds": {
					        "x": 1,
					        "y": 1,
					        "width": 0.5,
					        "height": 0.5
					      },
					      "createdAt": "2014-04-14T05:44:16.735Z",
					      "index": 0,
					      "state": "draft"
					    },
					    {
					      "slug": "534b75b0b6b44d7e40d67987",
					      "author": "534b75b0b6b44d7e40d67979",
					      "page": "534b75b0b6b44d7e40d67983",
					      "sortOrder": 4,
					      "_id": "534b75b0b6b44d7e40d67987",
					      "__v": 0,
					      "translation": {
					        "md": "This is the fourth play of abrazare, which succeeds easily if the student can put the opponent to the ground. If he can’t do it in this manner, he can use other plays and other grapples, in ways that we will see later. You will learn that the plays are not all the same, and grapples are seldom identical; therefore, if you don’t have a good grip, try to gain one as quickly as you can, or else the advantage may go to the opponent.",
					        "html": "<p>This is the fourth play of abrazare, which succeeds easily if the student can put the opponent to the ground. If he can’t do it in this manner, he can use other plays and other grapples, in ways that we will see later. You will learn that the plays are not all the same, and grapples are seldom identical; therefore, if you don’t have a good grip, try to gain one as quickly as you can, or else the advantage may go to the opponent.</p>\n"
					      },
					      "bounds": {
					        "x": 0,
					        "y": 0,
					        "width": 0.5,
					        "height": 0.5
					      },
					      "createdAt": "2014-04-14T05:44:16.736Z",
					      "index": 0,
					      "state": "draft"
					    }
					  ],
					  "users": [
					    {
					      "name": {
					        "last": "User",
					        "first": "Admin"
					      },
					      "isAdmin": true,
					      "content": {},
					      "_id": "534b75b0b6b44d7e40d67979"
					    }
					  ]
					};
			res.send(page);
		});

		server.get('/pages/534b75b0b6b44d7e40d67988', function(req, res) {
			var page = {
					  "page": {
					    "slug": "7-recto",
					    "title": "7 Recto",
					    "author": "534b75b0b6b44d7e40d67979",
					    "treatise": "534b75b0b6b44d7e40d6797b",
					    "dziPath": "getty-dz/folio-07.dzi",
					    "sortOrder": 5,
					    "_id": "534b75b0b6b44d7e40d67988",
					    "__v": 0,
					    "visibility": "authenticated",
					    "createdAt": "2014-04-14T05:44:16.737Z",
					    "index": 5,
					    "state": "draft",
					    "sections": [
					      "534b75b0b6b44d7e40d67989",
					      "534b75b0b6b44d7e40d6798a",
					      "534b75b0b6b44d7e40d6798b",
					      "534b75b0b6b44d7e40d6798c"
					    ]
					  },
					  "sections": [
					    {
					      "slug": "534b75b0b6b44d7e40d67989",
					      "author": "534b75b0b6b44d7e40d67979",
					      "page": "534b75b0b6b44d7e40d67988",
					      "sortOrder": 1,
					      "_id": "534b75b0b6b44d7e40d67989",
					      "__v": 0,
					      "translation": {
					        "md": "In this grapple, I use my right hand against your throat to give you pain and suffering, which will cause you to go to the ground. Also, if I grab you under the left knee with my left hand, I will be even surer of your falling down.",
					        "html": "<p>In this grapple, I use my right hand against your throat to give you pain and suffering, which will cause you to go to the ground. Also, if I grab you under the left knee with my left hand, I will be even surer of your falling down.</p>\n"
					      },
					      "bounds": {
					        "x": 1,
					        "y": 1,
					        "width": 0.5,
					        "height": 0.5
					      },
					      "createdAt": "2014-04-14T05:44:16.739Z",
					      "index": 0,
					      "state": "draft"
					    },
					    {
					      "slug": "534b75b0b6b44d7e40d6798a",
					      "author": "534b75b0b6b44d7e40d67979",
					      "page": "534b75b0b6b44d7e40d67988",
					      "sortOrder": 2,
					      "_id": "534b75b0b6b44d7e40d6798a",
					      "__v": 0,
					      "translation": {
					        "md": "I am the Counter to the fifth play just shown. If I use my right hand against his arm to remove his hand from my face, I can turn him and put him to the ground as shown. Or, I will gain a good grapple or bind, and your abrazare won’t give me much worry.",
					        "html": "<p>I am the Counter to the fifth play just shown. If I use my right hand against his arm to remove his hand from my face, I can turn him and put him to the ground as shown. Or, I will gain a good grapple or bind, and your abrazare won’t give me much worry.</p>\n"
					      },
					      "bounds": {
					        "x": 0,
					        "y": 0,
					        "width": 0.5,
					        "height": 0.5
					      },
					      "createdAt": "2014-04-14T05:44:16.741Z",
					      "index": 0,
					      "state": "draft"
					    },
					    {
					      "slug": "534b75b0b6b44d7e40d6798b",
					      "author": "534b75b0b6b44d7e40d67979",
					      "page": "534b75b0b6b44d7e40d67988",
					      "sortOrder": 3,
					      "_id": "534b75b0b6b44d7e40d6798b",
					      "__v": 0,
					      "translation": {
					        "md": "Thanks to the grapple I have gained and the way I hold you, I will lift you from the ground with all my might and have you under my feet, head first, then body. You won’t be able to perform a good counter to this.",
					        "html": "<p>Thanks to the grapple I have gained and the way I hold you, I will lift you from the ground with all my might and have you under my feet, head first, then body. You won’t be able to perform a good counter to this.</p>\n"
					      },
					      "bounds": {
					        "x": 1,
					        "y": 1,
					        "width": 0.5,
					        "height": 0.5
					      },
					      "createdAt": "2014-04-14T05:44:16.742Z",
					      "index": 0,
					      "state": "draft"
					    },
					    {
					      "slug": "534b75b0b6b44d7e40d6798c",
					      "author": "534b75b0b6b44d7e40d67979",
					      "page": "534b75b0b6b44d7e40d67988",
					      "sortOrder": 4,
					      "_id": "534b75b0b6b44d7e40d6798c",
					      "__v": 0,
					      "translation": {
					        "md": "I’m pressing my thumb under your ear, giving you so much pain that you’ll go to the ground without a doubt; or else, I’ll do another grapple or bind that will be worse than torture. The counter performed by the sixth play against the fifth (i.e., placing your hand under the opponent’s elbow) may be done against me without a doubt.",
					        "html": "<p>I’m pressing my thumb under your ear, giving you so much pain that you’ll go to the ground without a doubt; or else, I’ll do another grapple or bind that will be worse than torture. The counter performed by the sixth play against the fifth (i.e., placing your hand under the opponent’s elbow) may be done against me without a doubt.</p>\n"
					      },
					      "bounds": {
					        "x": 0,
					        "y": 0,
					        "width": 0.5,
					        "height": 0.5
					      },
					      "createdAt": "2014-04-14T05:44:16.744Z",
					      "index": 0,
					      "state": "draft"
					    }
					  ],
					  "users": [
					    {
					      "name": {
					        "last": "User",
					        "first": "Admin"
					      },
					      "isAdmin": true,
					      "content": {},
					      "_id": "534b75b0b6b44d7e40d67979"
					    }
					  ]
					};
			res.send(page);
		});

	});

};