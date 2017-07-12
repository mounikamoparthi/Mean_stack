const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    name: {
        first: {
          type: String,
          required: true,
          minlength: [2, "First name should be at least 2 characters"],
          trim: true,
          validate: [{
                validator: (txt) => {
                return /^[A-Za-z]+$/.test(txt);
                },
            message: "First name should only be letters"
      }]
    }
    },
        last: {
          type: String,
          minlength: [2, "Last name should be at least 2 characters"],
          trim: true,
          validate: [{
                validator: (txt) => {
                return /^[A-Za-z]+$/.test(txt);
                },
            message: "Last name should only be letters"
      }]
      },
      email: {
          type: String,
          requires: [true, "Email cannot be blank"],
          trim:true,
          unique: true,
          validate: {
              validator: function(email){
                  return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
              },
              message: "email not in proper format"
          }
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 32,
        validate: {
          validator: function( value ) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
          },
          message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }
      }, 
}, {timestamps: true})

LoginSchema.virtual( 'name.full' ).get( function () {
  return this.name.first + " " + this.name.last;
  // return `${ this.name.first } ${ this.name.last}`;
});

LoginSchema.pre('save', function(done){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    console.log(this.password)
    done();
})
mongoose.model('Login', LoginSchema);
