import React from "react";
import { User } from "../../lib/api";

interface ItemProps {
  loadingPost: boolean;
  post: any;
}

function Item({ loadingPost, post }: ItemProps) {
  return (
    <div>
      <section>
        <h1>포스트</h1>
        {loadingPost && "로딩 중..."}
        {!loadingPost && post && (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        )}
      </section>
    </div>
  );
}

export default Item;
