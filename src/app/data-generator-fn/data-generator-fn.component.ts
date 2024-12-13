import { Component, OnInit } from '@angular/core';
import { DataGeneratorService } from '../services/data-generator.service';
import { saveAs } from 'file-saver';
interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-data-generator-fn',
  templateUrl: './data-generator-fn.component.html',
  styleUrls: ['./data-generator-fn.component.css'],
})
export class DataGeneratorFnComponent {
  constructor(private dataGeneratorService: DataGeneratorService) {}

  cols!: Column[];
  randomTypeOptions: any[] = [];
  dataTypeOptions: any[] = [
    {
      name: 'Varchar',
      example: ['Jl. Sudirman No. 1', 'john@example.com'],
      disabled: false,
    },
    {
      name: 'Text',
      example: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.'],
      disabled: true,
    },
    {
      name: 'Int',
      example: ['42', '99999'],
      disabled: false,
    },
    {
      name: 'Decimal',
      example: ['99.99', '0.1234'],
      disabled: false,
    },
    {
      name: 'Float',
      example: ['123.45', '1.2e10'],
      disabled: true,
    },
    {
      name: 'BigInt',
      example: ['9223372036854775807', '123456789012345'],
      disabled: true,
    },
    {
      name: 'Time',
      example: ['10:15:30', '23:59:59'],
      disabled: true,
    },
    {
      name: 'DateTime',
      example: ['2024-12-09 10:15:30', '2023-05-01 00:00:00'],
      disabled: true,
    },
  ];
  products = [
    {
      id: 1,
      columnName: 'id',
      columnDataType: 'Varchar',
      randomType: 'rstring',
      rangeFormatValue: '',
      disableAttribute: false,
    },
    {
      id: 2,
      columnName: 'name',
      columnDataType: 'Varchar',
      randomType: 'rname',
      rangeFormatValue: '',
      disableAttribute: false,
    },
    {
      id: 3,
      columnName: 'amount',
      columnDataType: 'Int',
      randomType: 'rprice',
      rangeFormatValue: '10-100',
      disableAttribute: false,
    },
  ];
  visibleRandomTypeOptions: boolean = false;
  visibleDataTypeOptions: boolean = false;
  visibleError: boolean = false;
  duplicatesColumn: string[] = [];
  indexRandom: number = 0;
  indexDataType: number = 0;
  generateWithOptions: string[] = ['Size', 'Rows'];
  generateWith: string = 'Size';
  fileSize: number = 500;
  fileRows: number = 1000;
  sizeUnit: string = 'MB';
  sizeUnitOptions: any[] = [
    { name: 'MB', disabled: false },
    { name: 'GB', disabled: false },
  ];
  fileName: string = 'dummy-generator';
  fileFormatOptions: string[] = ['CSV', 'SQL'];
  fileFormat: string = 'CSV';
  downloadAs: string = 'Script';
  downloadAsOptions: any[] = [
    { name: 'Script', disabled: false },
    { name: 'File', disabled: false },
  ];
  errorMessage: string[] = [];
  tableName: string = 'dummy_table';
  dataGenerate: any = {
    tableName: '',
    totalRows: 0,
    fileName: '',
    fileTypeDestination: '',
    listColumnDetails: [
      {
        columnName: '',
        columnDataType: '',
        randomType: '',
        rangeFormatValue: '',
      },
    ],
  };
  ngOnInit(): void {
    this.loadRandomTypeList();
    this.cols = [
      { field: 'columnName', header: 'Field Name' },
      { field: 'columnDataType', header: 'Data Type in Table' },
      { field: 'randomType', header: 'Random Data Type' },
      { field: 'rangeFormatValue', header: 'Attribute' },
    ];
  }

  loadRandomTypeList() {
    this.dataGeneratorService.getRandomTypeList().subscribe({
      next: (data: any) => {
        this.randomTypeOptions = data; // Simpan data ke variabel
      },
      error: (err: any) => {
        console.error('Gagal mengambil data:', err);
      },
    });
  }

  openRandomTypeDialog(index: any) {
    this.indexRandom = index;
    this.visibleRandomTypeOptions = true;
  }
  openDataTypeDialog(index: any) {
    this.indexDataType = index;
    this.visibleDataTypeOptions = true;
  }
  onSelectRandomType(type: any) {
    this.products[this.indexRandom].randomType = type.randomType;
    this.products[this.indexRandom].disableAttribute = !type.needAttribute;
    console.log(this.products);
    console.log(type.needAttribute);
    this.visibleRandomTypeOptions = false;
  }
  onSelectDataType(type: any) {
    this.products[this.indexRandom].columnDataType = type;
    this.visibleDataTypeOptions = false;
  }
  addField() {
    let lastElement = this.products[this.products.length - 1];
    let newElement = { ...lastElement, id: lastElement.id + 1 };
    this.products = [...this.products, newElement];
  }
  deleteProduct(product: any) {
    this.products = this.products.filter((val) => val.id !== product.id);
  }
  resetTable() {
    this.products = [
      {
        id: 1,
        columnName: 'id',
        columnDataType: 'Varchar',
        randomType: 'rstring',
        rangeFormatValue: '',
        disableAttribute: false,
      },
      {
        id: 2,
        columnName: 'name',
        columnDataType: 'Varchar',
        randomType: 'rname',
        rangeFormatValue: '',
        disableAttribute: false,
      },
      {
        id: 3,
        columnName: 'amount',
        columnDataType: 'Int',
        randomType: 'rprice',
        rangeFormatValue: '10-100',
        disableAttribute: false,
      },
    ];
  }
  findDuplicateColumnNames(): string[] {
    const nameCounts: Record<string, number> = {}; // Menyimpan jumlah kemunculan setiap columnName
    const duplicates: string[] = []; // Menyimpan columnName yang duplikat

    // Hitung jumlah kemunculan setiap columnName
    this.products.forEach((product) => {
      nameCounts[product.columnName] =
        (nameCounts[product.columnName] || 0) + 1;
    });

    // Temukan columnName yang jumlahnya lebih dari 1
    for (const [columnName, count] of Object.entries(nameCounts)) {
      if (count > 1) {
        duplicates.push(columnName);
      }
    }

    return duplicates;
  }

  generateData(osType: string) {
    this.duplicatesColumn = this.findDuplicateColumnNames();
    if (this.duplicatesColumn.length > 0) {
      this.duplicatesColumn.forEach((x) => {
        this.errorMessage.push(
          `Column "${x}" is specified more than once. Column names must be unique.`
        );
      });
    }
    if (this.generateWith === 'Size' && this.fileSize <= 0) {
      this.errorMessage.push(`Size must be a positive number.`);
    } else if (this.generateWith === 'Rows' && this.fileRows <= 0) {
      this.errorMessage.push(`Rows must be a positive number.`);
    }
    // if (!this.fileName) {
    //   this.errorMessage.push('File name is required.');
    // }
    if (this.errorMessage.length > 0) {
      this.visibleError = true;
    } else this.downloadFile(osType);
  }
  closeDialogError() {
    this.errorMessage = [];
    this.visibleError = false;
  }

  downloadFile(osType: string) {
    let fileRows = this.fileRows;
    let fileSize =
      this.sizeUnit === 'MB'
        ? this.fileSize * 1048576
        : this.fileSize * 1073741824;
    this.generateWith === 'Size' ? (fileRows = 0) : (fileSize = 0);
    const duplicatedWithoutId = this.products.map(({ id, ...rest }) => rest);
    this.dataGenerate = {
      tableName: this.tableName === '' ? 'dummy_table' : this.tableName,
      totalRows: fileRows,
      fileName: this.fileName,
      fileTypeDestination: this.fileFormat,
      listColumnDetails: duplicatedWithoutId,
    };
    this.dataGeneratorService
      .downloadFile(fileSize, osType, this.dataGenerate)
      .subscribe((blob) => {
        saveAs(
          blob,
          `${this.fileName === '' ? 'dummy-generator' : this.fileName}.exe`
        );
      });
  }

  changeDownloadAs(event: any) {
    console.log(event);
    if (event.value === 'File') {
      if (this.fileSize > 100) this.fileSize = 100;
      this.sizeUnit = 'MB';
      this.sizeUnitOptions[1].disabled = true;
    } else {
      this.sizeUnitOptions[1].disabled = false;
    }
  }

  change(event: any) {
    console.log(event);
  }
}
