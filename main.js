// scripts principais: validação simples e máscaras para CPF, telefone e CEP
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('formCadastro');
  if(form){
    form.addEventListener('submit', function(e){
      if(!form.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('msg').textContent = 'Por favor, corrija os campos em destaque.';
      } else {
        e.preventDefault();
        document.getElementById('msg').textContent = 'Cadastro enviado (simulação).';
        form.reset();
      }
    });

    // máscaras simples
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('telefone');
    const cep = document.getElementById('cep');

    function setInputFilter(textbox, filter) {
      textbox.addEventListener('input', function() {
        if (filter(this.value)) {
          this.oldValue = this.value;
        } else if (this.hasOwnProperty('oldValue')) {
          this.value = this.oldValue;
        } else {
          this.value = '';
        }
      });
    }

    setInputFilter(cpf, function(value) {
      return /^\d{0,11}$/.test(value.replace(/\D/g,''));
    });
    cpf.addEventListener('input', function(){
      let v = this.value.replace(/\D/g,'');
      v = v.replace(/(\d{3})(\d)/,'$1.$2');
      v = v.replace(/(\d{3})(\d)/,'$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
      this.value = v;
    });

    setInputFilter(tel, function(value) {
      return /^\d{0,11}$/.test(value.replace(/\D/g,''));
    });
    tel.addEventListener('input', function(){
      let v = this.value.replace(/\D/g,'');
      if(v.length>10){
        v = v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
      } else {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3');
      }
      this.value = v;
    });

    setInputFilter(cep, function(value) {
      return /^\d{0,8}$/.test(value.replace(/\D/g,''));
    });
    cep.addEventListener('input', function(){
      let v = this.value.replace(/\D/g,'');
      v = v.replace(/(\d{5})(\d)/,'$1-$2');
      this.value = v;
    });
  }
});
