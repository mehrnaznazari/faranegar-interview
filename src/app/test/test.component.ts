import {Component, OnInit} from '@angular/core';
import {
  AppConfigService,
  FararuGenralTemplatesModule,
  GeneralDataEntryConfig,
  GeneralODataTableName, GridColumnDataTypes, HttpHeaderNames, OdataHttpHeaders
} from 'fararu-common-lib';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  imports: [
    FararuGenralTemplatesModule
  ],
  standalone: true
})
export class TestComponent implements OnInit {
  readonly ODataEntity = 'ManufacturerModel';
  readonly ODataTable: string = GeneralODataTableName;

  oDataHttpHeaders: OdataHttpHeaders = {
    [HttpHeaderNames.FETCH_REASON]: '0',
  };
  oDataServer: string;
  config!: GeneralDataEntryConfig<UnitModelType>;
  // config!: GeneralDataEntryConfig<DataEntryFieldConfigInterface>;

  constructor(private _appConfigService: AppConfigService) {
    this.oDataServer = this._appConfigService.config.api.baseUrl;
  }

  ngOnInit(): void {

    this.config ={
      formConfig: {
        id: {
          label: 'شناسه',
          formConfig: {
            type: 'textbox',
            inputType: 'number',
            disabled: () => true,
          },
          listConfig: {
            visible: false,
          },
        },
        unitCode: {
          label: 'کد واحد',
          formConfig: {
            type: 'textbox',
            inputType: 'string',
            maxlength: 9,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
              },
            ],
          },
          listConfig: {
            dataType: GridColumnDataTypes.STRING,
            visible: true,
          },
        },
        unitName: {
          label: 'نام واحد',
          formConfig: {
            type: 'textbox',
            maxlength: 50,
            disabled: (currentValues: UnitModelType) => !currentValues.unitCode,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
              },
            ],
          },
          listConfig: {
            dataType: GridColumnDataTypes.STRING,
            visible: true,
          },
        },
        description: {
          label: 'توضیحات',
          formConfig: {
            type: 'textbox',
            inputType: 'string',
            columnWidth: 12,
            conditionalValue: (userTouchedField: boolean) => ({
              dependencies: ['unitCode', 'unitName'],
              setup: (
                currentValues: UnitModelType
              ) => {
                if (userTouchedField) return undefined;
                let desc = '';
                if (currentValues.unitCode) desc += `${currentValues.unitCode} `;
                if (currentValues.unitName) desc += `${currentValues.unitName}`;
                return desc.trim();
              },
            }),
          },
          listConfig: {
            visible: false,
          },
        },
      },
    };

  }
}

 type UnitModelType = {
  id: number | null;
  unitCode: string | null;
  unitName: string | null;
  description: string | null;
}
