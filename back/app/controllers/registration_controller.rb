class RegistrationController < ApplicationController
    def register(user)
        raise "Seu corno" unless user.email.ends_with("@gmail.com")
        raise "A senha tem que ser grande, animal" unless user.password.length >= 8

        User.create(user)
    end

    def login(user)

    end

end

# {name: "Pidim"}