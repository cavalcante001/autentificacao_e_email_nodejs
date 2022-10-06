import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface TarefaInstance extends Model {
   id: number,
   titulo: string,
   feito: boolean
}

export const Tarefa = sequelize.define<TarefaInstance>('Tarefas', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    }, 
    titulo: {
        type: DataTypes.STRING
    }, 
    feito: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'tarefa',
    timestamps: false
});