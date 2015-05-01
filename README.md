# Inspiration

- [Meteor Server-Side Rendering for SEO Purposes](https://meteorhacks.com/meteor-server-sider-rendering-for-seo-purpose.html)

- Some Stack Overflow questions I can't find right now

# Reasoning

PhantomJS commonly (for me) times out when rendering a page. The reliability isn't there.

Also, I didn't want to have to redefine templates in the private folder. This allows me to update the client templates and it will also effect the server rendered templates.

The main goal is to handle any public facing pages that are mostly static content (home, about, pricing, etc). Not pages with dynamic content.

Lastly, I wanted to be able to change my route info in one spot and it will effect both my client and server routes.

# Pitfalls

- Currently the server rendered page is delivered without any styling. This is okay for crawlers though.

- You have to redefine any helpers you have on the client for a given template.

- You have to create a dedicated server template.

# Configuration

## Packages

- `iron:router`
- `meteorhacks:ssr`
- `underscore`

## Setting up the symlink
- `cd private && ln -s ../client/templates/ templates`

# TODO
- Figure out a way to parse and correctly use the existing client side helpers
- Server css as well.
