require 'rails_helper'


  

describe RegistrationController, type: :controller do
  describe "login" do
    it "login success" do
      post :register, params: { user: { name: "Ana", email: "guthyerri@davi.alice", password: "123456789", password_confirmation:"123456789", city: "Mombaça", state:"CE", photographer: false } }
      post :login, params: { user: { email: "guthyerri@davi.alice" , password: "123456789" } }
      expect(response.status).to eq 200
    end
  end
end


# Login de usuario que não existe
describe RegistrationController, type: :controller do
  describe "login" do
    it "login fail" do
      post :login, params: { user: { email: "alice@aliiiice.com" , password: "123456789" } }
      expect(response.status).to eq 401
    end
  end
end


# registro de fotografo que da tudo certo
describe RegistrationController, type: :controller do
  describe "register photographer" do
    it "register success" do
      post :register, params: { user: { name: "Alice", email: "alicinha@gmail.com", password: "123456789", password_confirmation:"123456789", city: "Mombaça", state:"CE", photographer: true } }
      expect(response.status).to eq 200
    end
  end
end

# registro  que NÃO é pra dar certo (senhas diferentes)
describe RegistrationController, type: :controller do
  describe "register photographer" do
    it "register fail" do
      post :register, params: { user: { name: "Ana", email: "ana@gmail.com", password: "123456789", password_confirmation:"analindona123", city: "Mombaça", state:"CE", photographer: true } }
      expect(response.status).to eq 400 
    end
  end
end

# registro  que NÃO é pra dar certo (EMAIL JA EXISTIA NO SISTEMA)
describe RegistrationController, type: :controller do
  describe "register with already used email" do
    it "register fail" do
      post :register, params: { user: { name: "Ana", email: "guthyerri@davi.alice", password: "123456789", password_confirmation:"123456789", city: "Mombaça", state:"CE", photographer: false } }
      post :register, params: { user: { name: "Ana", email: "guthyerri@davi.alice", password: "123456789", password_confirmation:"123456789", city: "Mombaça", state:"CE", photographer: false } }
      expect(response.status).to  409
    end
  end
end

# registro de user comum que da tudo certo
describe RegistrationController, type: :controller do
  describe "register normal people" do
    it "register success" do
      post :register, params: { user: { name: "Alana", email: "alana@gmail.com", password: "123456789", password_confirmation:"123456789", city: "Miami", state:"CE", photographer: false } }
      expect(response.status).to eq 200
    end
  end
end

