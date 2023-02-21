# syntax = docker/dockerfile:1

# Make sure it matches the Ruby version in .ruby-version and Gemfile
ARG RUBY_VERSION=2.7.6
FROM ruby:$RUBY_VERSION-slim as base

# Rails app lives here
WORKDIR /rails

# Set test environment
ENV RAILS_ENV="test"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages need to build gems
RUN apt-get update -qq && \
    apt-get install -y build-essential git pkg-config libvips

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install


# Copy application code
COPY . .

# Final stage for app image
FROM base

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y libsqlite3-0 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built artifacts: gems, application
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

# Entrypoint prepares the database.
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["./bin/rails", "server"]
