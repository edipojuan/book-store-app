import {
  OnInit,
  Injector,
  OnChanges,
  SimpleChanges,
  Input
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

// import { Services } from './../../../shared/base/service/services';

export abstract class BaseForm implements OnInit, OnChanges {
  @Input() params: any;

  form: FormGroup;

  submitted = false;

  // protected services: Services;
  protected formBuilder: FormBuilder;

  constructor(injector: Injector) {
    // this.services = injector.get(Services);
    this.formBuilder = injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({});
    this.onInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.params && changes.params.currentValue) {
      this.baseClear();
      this.defaultValue();
      this.changed();
    }
  }

  private baseClear() {
    this.submitted = false;

    this.form.reset();

    this.clear();
  }

  clear() {}

  defaultValue() {}

  changed() {}

  onInit() {}

  onSubmit() {
    if (this.form.valid) {
      this.submit();
    } else {
      this.submitted = true;
      console.log('Formulário inválido');
    }
  }

  abstract submit(): void;

  addControl(
    controlName: string,
    validators?: any,
    value?: any,
    formGroupName?: string
  ) {
    const formBuilderGroup = formGroupName
      ? (this.form.get(formGroupName) as FormGroup)
      : this.form;

    const formControl = new FormControl(value, validators);
    formBuilderGroup.addControl(controlName, formControl);
    formBuilderGroup.get(controlName).updateValueAndValidity();
  }

  existControl = (controlName: string) => this.form.contains(controlName);
  hasValueControl = (controlName: string) => this.form.get(controlName).value;

  applyCssError(controlName: string) {
    let cssClass = {};

    if (this.verifyTouched(controlName)) {
      cssClass = {
        'has-error': !this.verifyValid(controlName),
        'has-feedback': !this.verifyValid(controlName)
      };
    }

    cssClass = { ...cssClass, 'field-valid': this.verifyValid(controlName) };

    return cssClass;
  }

  setValueNoEvent(controlName: string, value: string) {
    const options = { onlySelf: true, emitEvent: false };
    this.form.get(controlName).setValue(value, options);
  }

  verifyTouched = (controlName: string) => this.form.get(controlName).touched;
  verifyValid = (controlName: string) => this.form.get(controlName).valid;

  clearFormArray(formArray: FormArray) {
    while (formArray.length > 0) {
      formArray.removeAt(0);
    }
  }

  addItemFormArray(formArray: FormArray, item: any) {
    formArray.push(item);
  }

  addFormControlInFormArray(
    formArray: FormArray,
    formState = { value: false }
  ) {
    this.addItemFormArray(formArray, new FormControl(formState));
  }

  extractNumbers(value: any) {
    if (!value) {
      return value || 0;
    }

    return value.replace(/[^\d,]+/g, '').replace(',', '.');
  }

  disableAll(controlsName: string[], formGroupName?: string) {
    const form = formGroupName
      ? (this.form.get(formGroupName) as FormGroup)
      : this.form;

    controlsName.map((control) => form.get(control).disable());
  }
}
