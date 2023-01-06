import Counter from "./components/counter/Counter";
import AddPostForm from "./components/posts/AddPostForm";
import PostsList from "./components/posts/PostsList";


function App() {
  return (
    <main className="App">
      {/* <Counter /> */}
      <AddPostForm/>
      <PostsList />
    </main>
  );
}

export default App;
