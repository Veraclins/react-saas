import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import urlify from "../../shared/urlify";
import PropsRoute from "../../shared/PropsRoute";
import Home from "./home/Home";
import Blog from "./blog/Blog";
import BlogPost from "./blog/BlogPost";

function Routing(props) {
  const { blogPosts, selectBlog, selectHome } = props;

  return (
    <Switch>
      {blogPosts.map(post => (
        <PropsRoute
          /* We cannot use the url here as it contains the get params */
          path={`/blog/post/${urlify(post.title)}`}
          component={BlogPost}
          title={post.title}
          key={post.title}
          src={post.imageSrc}
          date={post.date}
          content={post.content}
          otherArticles={blogPosts.filter(blogPost => blogPost.id !== post.id)}
        />
      ))}
      <PropsRoute
        exact
        path="/blog"
        component={Blog}
        selectBlog={selectBlog}
        blogPosts={blogPosts}
      />
      )
      <PropsRoute path="/" component={Home} selectHome={selectHome} />)
    </Switch>
  );
}

Routing.propTypes = {
  blogPosts: PropTypes.array.isRequired,
  selectHome: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired
};

export default Routing;
