import React from 'react'
import { User } from '../../lib/api'

interface ItemProps {
    loadingPost: boolean;
    loadingUsers: boolean;
    post: any;
    users: User[];
}

function Item({loadingPost, loadingUsers, post, users}: ItemProps) {
    return (
        <div>
            <section>
                <h1>포스트</h1>
                {loadingPost && '로딩 중...'}
                {!loadingPost && post && (
                    <div>
                        <h3>{post.title}</h3>
                        <h3>{post.body}</h3>
                    </div>
                )}
            </section>
            <hr/>
            <section>
                <h1>사용자 목록</h1>
                {loadingUsers && '로딩 중...'}
                {!loadingUsers && users && (
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                {user.username} ({user.email})
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}

export default Item