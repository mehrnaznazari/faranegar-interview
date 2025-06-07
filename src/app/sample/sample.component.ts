import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  AppConfigService, FararuGenralTemplatesModule, GeneralDataEntryConfig,
  GeneralODataTableName,
  GridColumnDataTypes,
  HttpHeaderNames,
  OdataHttpHeaders, TextboxFormFieldConfig,
} from 'fararu-common-lib';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.scss',
  imports: [
    FararuGenralTemplatesModule
  ],
  standalone: true
})
export class SampleComponent implements OnInit {
  readonly ODataEntity = 'ManufacturerModel';
  readonly ODataTable: string = GeneralODataTableName;

  oDataHttpHeaders: OdataHttpHeaders = {
    [HttpHeaderNames.FETCH_REASON]: '0',
  };
  oDataServer: string;
  config!: GeneralDataEntryConfig<ManufacturerDataType>;

  constructor(private _appConfigService: AppConfigService) {
    this.oDataServer = this._appConfigService.config.api.baseUrl;
  }

  ngOnInit(): void {
    this.config = {
      formConfig: {
        manufacturerCode: {
          label: 'کد',
          formConfig: {
            type: 'textbox',
            inputType: 'string',
            maxlength: 10,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
              },
            ],
          },
        },
        manufacturerName: {
          label: 'نام',
          formConfig: {
            type: 'textbox',
            maxlength: 30,
            disabled: (currentValues: ManufacturerDataType) => {
              return !currentValues.manufacturerCode;
            },
            validators: [
              {
                name: 'required',
                validator: Validators.required,
              },
            ],
          },
        },
        dlCode: {
          label: 'کد تفصیل',
          formConfig: {
            type: 'textbox',
            inputType: 'number',
            maxlength: 10,
          },
          listConfig: {
            dataType: GridColumnDataTypes.STRING,
          },
        },
        manufacturerCode2: {
          label: 'کد ثانویه',
          formConfig: {
            type: 'textbox',
            inputType: 'string',
            maxlength: 3,
            dynamicConfig: {
              dependencies: ['dlCode'],
              setup: (
                currentValues: ManufacturerDataType,
                _previousValues: ManufacturerDataType,
                config: Omit<TextboxFormFieldConfig<ManufacturerDataType, string | null>, 'dynamicConfig'>
              ) => {
                if (currentValues.dlCode) {
                  config.validators = [
                    { name: 'required', validator: Validators.required },
                  ];
                } else {
                  config.validators = [];
                }
                return config;
              },
            },
          },
          listConfig: {
            dataType: GridColumnDataTypes.STRING,
          },
        },
        description: {
          label: 'توضیحات',
          formConfig: {
            type: 'textbox',
            inputType: 'string',
            columnWidth: 12,
            conditionalValue: () => ({
              dependencies: ['manufacturerCode', 'manufacturerName', 'dlCode'],
              setup: (currentValues: ManufacturerDataType) => {
                let description = '';
                if (currentValues.manufacturerCode)
                  description += `${currentValues.manufacturerCode} `;
                if (currentValues.manufacturerName)
                  description += `${currentValues.manufacturerName} `;
                if (currentValues.dlCode)
                  description += `( کد تفضیل ${currentValues.dlCode})`;
                return description.trim();
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

type ManufacturerDataType = {
  manufacturerCode: string | null;
  manufacturerName: string | null;
  dlCode: number | null;
  manufacturerCode2: string | null;
  description: string | null;
};
