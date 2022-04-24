class One{
    constructor(name){
        this.name = name
    }
    smile(){
        console.log('one'+this.name)
    }
}
class Two{
    constructor(name){
        this.one  = new One(name)
    }
    get name(){
        console.log('twog')
        this.smile()
    }
    set name(value){
        console.log('twos')
        this.one.name = value
    }
    smile(){
        this.one.smile()
    }
}
let a = new Two('test')
a.smile()
a.name='tes11'
let b= a.name