import { useDispatch } from "react-redux";
import { reactionsAdded } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😳",
  heart: "❤",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionsButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionsButtons = Object.entries(reactionEmoji).map(
    ([name, emoji]) => (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() => dispatch(reactionsAdded({ postId: post.id, reaction: name }))}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  );
  return <>
    {reactionsButtons}
  </>;
};

export default ReactionsButtons;
