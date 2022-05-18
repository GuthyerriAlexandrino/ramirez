25.times do 
  User.create(
    name: Faker::Name.name,
    email: Faker::Internet.safe_email,
    password: Faker::Internet.password,
    specialization: Faker::Hobby.activity,
    city: Faker::Address.city,
    state: Faker::Address.state
  )
end
