import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {

  //#region Variables
  txtTarea = new FormControl();
  sTitulo: string = "Lista de Tareas";
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'nIdTask',
    'isDone',
    'sNameTask',
    'Actions'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  TaskData = [
    {
      nIdTask: 1, isDone: true, sNameTask: "Tarea 01", isActive: true
    }
  ]
  //#endregion

  constructor(
    private router: Router,
    private taskService: TaskService
  ) {

    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit(): void {

    this.fnListTasks()

  }

  //#region Limpiar Caja de Texto
  async fnClearInput() {
    if (this.dataSource) {
      this.dataSource.filter = '';
    }
    this.txtTarea.setValue('');
  }
  //#endregion


  //#region Listar Tareas
  async fnListTasks() {

    let nOpcion = 1
    let pParametro: any = [];

    await this.taskService.fnServiceTask(nOpcion, pParametro).subscribe({
      next: (data) => {

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => {
        console.error(e)
      }
    });

  }
  //#endregion


  //#region Agregar Tareas
  async fnAddTask() {

    let NameTask = this.txtTarea.value;
    let isDone = 0
    let isActive = 1

    let nOpcion = 2
    let pParametro: any = [];
    pParametro.push(NameTask);
    pParametro.push(isDone);
    pParametro.push(isActive);

    await this.taskService.fnServiceTask(nOpcion, pParametro).subscribe({
      next: () => {

        this.fnListTasks();

      },
      error: (e) => {
        console.error(e)
      }
    });

  }
  //#endregion


  //#region Estado Checkbox
  async onChangeDone(IdTask: number, isDone: boolean) {

    let nOpcion = 3
    let pParametro: any = [];
    pParametro.push(IdTask);
    pParametro.push(!isDone);

    await this.taskService.fnServiceTask(nOpcion, pParametro).subscribe({
      next: () => {

        this.fnListTasks();

      },
      error: (e) => {
        console.error(e)
      }
    });

  }
  //#endregion


  //#region Eliminar
  async onChangeState(IdTask: number) {
    let sTitulo, sRespuesta: string = "";

    sTitulo = '¿Desea eliminar la tarea?'
    sRespuesta = 'Se eliminó  la tarea con éxito'


    var resp = await Swal.fire({
      title: sTitulo,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    })

    if (!resp.isConfirmed) {
      return;
    }

    let pParametro = [];
    pParametro.push(IdTask);
    pParametro.push(0);

    await this.taskService.fnServiceTask(4, pParametro).subscribe({
      next: (data) => {

        if (data.cod == 1) {
          Swal.fire({
            title: sRespuesta,
            icon: 'success',
            timer: 3500
          })
        }
        this.fnListTasks();
      },
      error: (e) => console.error(e),
      //complete: () => console.info('complete')
    });

  }
  //#endregion

}
