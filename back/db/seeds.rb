hobbies = %W(Nenhum
            #{'Eventos Sociais'}
            Publicidade
            Arquitetura
            Revistas
            Moda
            Jornalismo
            Astronomia
            Forense
            Comercial
            Industrial
            Natureza
            Subaquático
            Cientifico 
            #{'Documentos Oficiais'}
            Aerofotografia
            Documentarista
            #{'Nu Artístico'}
            #{'Modelos Dental'} 
            Eróticas
            Sensuais 
            Animais 
            Books
            Crianças 
            Esportes 
            Medicina 
            #{'Festas Infantis'}
            Produtos 
            #{'Abstrata e Artística'}
            Cinema
          )

rng = Random.new

25.times do 
  User.create(
    name: Faker::Name.name,
    email: Faker::Internet.safe_email,
    password: Faker::Internet.password,
    specialization: [hobbies[rng.rand(0...hobbies.size)]],
    city: Faker::Address.city,
    state: Faker::Address.state_abbr,
    photographer: true,
  )
end

25.times do 
  User.create(
    name: Faker::Name.name,
    email: Faker::Internet.safe_email,
    password: Faker::Internet.password,
    photographer: false,
  )
end

User.create(
  name: "Ramirez",
  email: "guthyerri@davi.alice",
  password: "e o que he man?",
  specialization: ["Dar dinheiro para fotógrafos"],
  city: "Quixadá",
  state: "CE",
  photographer: true,
)

hobbies.each { |e| Specialization.create(name: e) }