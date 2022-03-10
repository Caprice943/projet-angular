import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserLdap } from '../../model/user-ldap';
import { UsersService } from '../../service/users.service';
import { FormBuilder } from '@angular/forms';
import {
  ConfirmValidParentMatcher,
  passwordValidator,
} from './passwords-validator.directive';

export abstract class LdapDetailComponent {
  user: UserLdap;
  processLoadRunning = false;
  processValidateRunning = false;
  //le PlaceHolder pour les mots de passe en fonction de l edition ou non
  passwordPlaceHolder: string;
  errorMessage = '';
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  userForm = this.fb.group({
    login: [''], //valeur de départ vide
    nom: [''],
    prenom: [''],

    //Groupe de données imbriqué
    passwordGroup: this.fb.group(
      {
        password: [''],
        confirmPassword: [''],
      },
      { validators: passwordValidator }
    ),
    mail: { value: '', disabled: true },
  });

  protected constructor(
    public addForm: boolean,
    //protected route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.passwordPlaceHolder =
      'Mot de passe ' + (this.addForm ? '' : '(vide si inchangé)');
  }

  onInit(): void {
    //this.getUser();
    //permet d'initialiser le formulaire au cas où
    //Nous n'en avons pas besoin ici
  }

  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }

  goToLdap(): void {
    this.router.navigate(['/users/list']);
  }

  abstract validateForm(): void;

  onSubmitForm(): void {
    this.validateForm();
  }

  updateLogin(): void {
    //On ne fait la mise à jour que lors de l'ajout d'un user
    this.userForm
      .get('login')
      .setValue(
        (
          this.formGetValue('prenom') +
          ' . ' +
          this.formGetValue('nom')
        ).toLowerCase()
      );
    this.updateMail();
  }

  updateMail(): void {
    //On ne fait la mise à jour que lors de l'ajout d'un user
    this.userForm
      .get('mail')
      .setValue(this.formGetValue('login').toLowerCase() + '@domain.com');
  }

  isFormValid(): boolean {
    return (
      this.userForm.valid &&
      //Exemple de validation d'un champ
      (!this.addForm || this.formGetValue('passwordGroup.password') !== '')
    );
  }

  //Permet d'afficher les propriétes de UserLdap dans le formulaire
  protected copyUserToFormControl(): void {
    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail);

    /*Add ces champs au formulaire
    this.userForm.get('employeNumero').setValue(this.user.employeNumero);
    this.userForm.get('employeNiveau').setValue(this.user.employeNiveau);
    this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
    this.userForm.get('pushisherId').setValue(this.user.pushisherId);
    this.userForm.get('active').setValue(active);
    */
  }

  //Permet de récupere les valeurs du formulaire et
  //retourner un objet UserLdap avec ces valeurs
  protected getUserFromFormControl(): UserLdap {
    return {
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet:
        this.userForm.get('nom').value + '' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,

      //les valeurs suivantes devraient être prise du formulaire
      employeNumero: 1,
      employeNiveau: 1,
      dateEmbauche: '2020-04-24',
      publishereId: 1,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER',
    };
  }
} //fin de la classe
