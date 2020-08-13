const express = require("express");
const cors = require("cors");
const monk = require("monk");
const Filter = require("bad-words");

const app = express();

const db = monk(process.env.MONGO_URI || "localhost/classroomHost");
const lessonCollection = db.get("lessonCollection");
const filter = new Filter();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Ashe",
  });
});

app.get("/lessonCollection", (req, res) => {
  lessonCollection.find().then((lessonCollection) => {
    res.json(lessonCollection);
  });
});

function isValidPost(post) {
  return (
    post.objective &&
    post.objective.toString().trim() !== "" &&
    post.gradeLevel &&
    post.gradeLevel.toString().trim() !== "" &&
    post.lessonDate &&
    post.lessonDate.Date !== "" &&
    post.proverb &&
    post.proverb.toString().trim() !== ""
  );
}

app.post("/lessonCollection", (req, res) => {
  if (isValidPost(req.body)) {
    //insert into db
    const post = {
      proverb: filter.clean(req.body.proverb.toString()),
      objective: filter.clean(req.body.objective.toString()),
      gradeLevel: filter.clean(req.body.gradeLevel.toString()),
      lessonDate: filter.clean(req.body.lessonDate.toString()),
      created: new Date(),
    };

    lessonCollection.insert(post).then((createdPost) => {
      res.json(createdPost);
    });
    console.log(post);
  } else {
    res.status(422);
    res.json({
      message: "First I need your content!",
    });
  }
});

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});
