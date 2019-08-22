workflow "db-interface" {
  on = "push"
  resolves = ["ESLint"]
}

action "ESLint" {
  uses = "stefanoeb/eslint-action@master"
  args = ". --ext .js --ext .vue"
}
