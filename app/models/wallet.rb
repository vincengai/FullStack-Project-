class Wallet < ApplicationRecord
    validates :user_id, :coin_id, :symbol, :name, presence: true 

    belongs_to :user, 
    foreign_key: :user_id,
    class_name: :User

    belongs_to :coin




    
    # has_many :coins, 
    # foreign_key: :coin_id,
    # class_name: :Coin

    # # This will help find the proper wallet to update
    # def self.get_wallet(user_id, symbol)
    #     wallet = Wallet.find_by(user_id: user_id, symbol: symbol)
    # end

    # # Quantity because transactions are in BTC
    # def update_value(quantity)
    #     if quantity > 0  # First If statement is for buying (if there are funds)
    #         self.total_value = self.total_value + quantity  

    #     else # Else statement is for selling because quantity would be negative value 
    #         self.total_value = self.total_value + quantity 
    #     end

    #     save!
    # end
end
