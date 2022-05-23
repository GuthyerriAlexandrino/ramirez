# Singleton class
class SpecializationHelper
  attr_reader :specializations
  def SpecializationHelper.instance
    @instance = SpecializationHelper.new if @instance.nil?
  end

  private
  def initialize
    @specializations = build_specializations()
  end

  def build_specializations()
    sps = Set.new()
    sp = Specialization.all()
    sp.each { |s| sps << s[:name] }
    sps
  end
end