const form = document.querySelector("form");
const loadingElement = document.querySelector(".loading");
const lessonCollectionElement = document.querySelector(".lessonCollection");
const proverbCollectionElement = document.querySelector(".proverbCollection");
const API_URL = "http://localhost:5000/lessonCollection";

loadingElement.getElementsByClassName.display = "";

listAllLessonCollection();
// listProverbCollection();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const lessonDate = formData.get("lessonDate");
  const objective = formData.get("objective");
  const proverb = formData.get("proverb");
  const gradeLevel = formData.get("gradeLevel");

  const post = {
    lessonDate,
    objective,
    gradeLevel,
    proverb,
  };
  console.log(post);
  form.style.display = "none";
  loadingElement.style.display = "";

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((createdPost) => {
      console.log(createdPost);
      form.reset();
      form.style.display = "";
      listAllLessonCollection();
      loadingElement.style.display = "none";
    });
});

function listAllLessonCollection() {
  listAllLessonCollection.innerHTML = "";
  fetch(API_URL)
    .then((response) => response.json())
    .then((lessonCollection) => {
      console.log(lessonCollection);
      lessonCollection.reverse();
      lessonCollection.forEach((post) => {
        const div = document.createElement("div");

        const pheader = document.createElement("h2");
        pheader.textContent = post.proverb;

        const header = document.createElement("h3");
        header.textContent = post.gradeLevel;

        const contents = document.createElement("p");
        contents.textContent = post.objective;

        const date = document.createElement("small");
        date.textContent = new Date(post.created);

        div.appendChild(pheader);
        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        lessonCollectionElement.appendChild(div);
      });

      // function listProverbCollection() {
      //   listProverbCollection.innerHTML = "";
      //   fetch(API_URL)
      //     .then((response) => response.json())
      //     .then((proverbCollection) => {
      //       console.log(proverbCollection);
      //       proverbCollection.reverse();
      //       proverbCollection.forEach((post) => {
      //         const div = document.createElement("div");

      //         const pheader = document.createElement("h2");
      //         pheader.textContent = post.proverb;

      //         div.appendChild(pheader);

      //         proverbCollectionElement.appendChild(div);
      //       });
      //     });
      // }

      loadingElement.style.display = "none";
    });
}
