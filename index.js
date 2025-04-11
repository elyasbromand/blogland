import express from "express";
import bodyParser from "body-parser";
const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//for active class of Nav bar we will use this middleware 
app.use((req, res, next) => {
    // Map path to a page name
    const routeToPage = {
      '/': 'home',
      '/createPage': 'create',
      '/about': 'about'
    };
  
    // Set this value globally for EJS to use
    res.locals.activePage = routeToPage[req.path] || ''; // if not found, empty
    next(); // go to the next route
  });

app.get("/", (req, res) => {
  res.render("index.ejs", { blogs: blogs });
});

app.get("/createPage", (req, res) => {
  res.render("create.ejs");
});

app.post("/create", (req, res) => {
  console.log(req.body);

  var data = {
    title: req.body["title"],
    author: req.body["author"],
    blog: req.body["blog"],
  };
  blogs.push(data);
  res.render("index.ejs", { blogs: blogs, created: "Blog Created ✅" });
});

app.get("/viewBlog/:index", (req, res) => {
  let index = req.params.index;
  res.render("viewBlog.ejs", { blogs: blogs[index] });
});

app.post("/edit", (req, res) => {
  let index = req.body["index"];
  res.render("edit.ejs", { blog: blogs[index], index: index });
});

app.post("/editSubmit", (req, res) => {
  let index = req.body["index"];
  var data = {
    title: req.body["title"],
    author: req.body["author"],
    blog: req.body["blog"],
  };
  blogs[index] = data;
  res.render("index.ejs", { blogs: blogs });
});

app.post("/delete", (req, res) => {
  let index = req.body["index"];
  blogs.splice(index, 1);
  res.render("index.ejs", { blogs: blogs });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

var blogs = [
    {
        title: "🧠 The Science Behind Lucid Dreaming: Hacking Your Dreams Like a Pro",
        author: "Elyas Bromand",
        blog: `Ever realized you're dreaming while you're dreaming? That’s lucid dreaming, and yes — it’s real, trainable, and kinda like your personal version of Inception. 😴✨

🌀 What is Lucid Dreaming?
Lucid dreaming is the state where you become aware that you’re dreaming, and with practice, you can even control the dream — from flying through alien galaxies to having deep convos with Einstein’s ghost (no cap 😅).

🧬 The Brain on Lucid Dreams
In a lucid dream, the prefrontal cortex (your logical decision-making brain) stays more active than usual. It’s like your imagination gets a cheat code — you’re asleep, but still slightly “awake” inside.

🔧 How to Train Yourself to Lucid Dream
Want to try? Here’s a quick training guide:

Reality Checks: Ask yourself “Am I dreaming?” multiple times a day. Try pushing your finger through your palm or reading a text twice.

Dream Journal: Write down your dreams every morning. It boosts your dream recall and helps you spot patterns.

Wake Back to Bed (WBTB): Wake up after 5–6 hours of sleep, stay awake for 20 minutes, then go back to sleep. It increases your chances of lucidity.

Meditation: Being mindful while awake helps you stay conscious while dreaming.

🤯 Cool Things You Can Do in Lucid Dreams
Fly through cities like Superman

Talk to your subconscious

Rehearse for public speaking or creative ideas

Solve real-life problems with dream logic

🎯 Final Thought
Lucid dreaming is one of the coolest ways to explore the limitless world inside your head. It's safe, it’s natural, and it's totally sci-fi in real life.

So next time you go to bed, remember: You might just be the main character in your own dream multiverse.

Sweet dreams, dream hacker. 🛌💭✨`
    }
];
