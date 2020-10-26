FROM elixir:1.9
# install hex package manager
RUN mix local.hex --force
# install phoenix
RUN mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez --force

RUN mkdir /api
COPY . /api
WORKDIR /api

ENV MIX_ENV=prod
ENV PORT=4000
ENV DATABASE_URL=ecto://postgres:postgres@db/time_api_dev
ENV SECRET_KEY_BASE=1WUSR/m2O/Pvrrxrg12jxAgUcUEvhwP3OhKMGJIWa7H6D4aEC4wmfZA789n0PurY

RUN mix local.rebar --force
RUN mix deps.get --only prod
RUN mix compile
RUN mix phx.digest
# run phoenix in production on PORT 4000
CMD mix ecto.setup && mix phx.server
