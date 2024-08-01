"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const jobs_service_1 = require("./jobs.service");
const create_job_dto_1 = require("./dto/create-job.dto");
const update_job_dto_1 = require("./dto/update-job.dto");
const find_job_dto_1 = require("./dto/find-job.dto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongodb_1 = require("mongodb");
let JobsController = class JobsController {
    constructor(jobsService, connection) {
        this.jobsService = jobsService;
        this.connection = connection;
    }
    async find(findJobDto) {
        const { collection, database, filter } = findJobDto;
        const db = this.connection.useDb(database);
        try {
            const documents = await db.collection(collection).find(filter).toArray();
            return documents;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async insertOne(body, res) {
        try {
            const { collection, database, document } = body;
            const db = this.connection.useDb(database);
            const result = await db.collection(collection).insertOne(document);
            res.status(200).json(result);
        }
        catch (error) {
            console.error('Error en la inserción:', error);
            res.status(500).json({ error: 'Error en la inserción de datos' });
        }
    }
    async findOne(findJobDto, res) {
        const { collection, database, filter } = findJobDto;
        const db = this.connection.useDb(database);
        try {
            if (filter._id) {
                filter._id = new mongodb_1.ObjectId(filter._id);
            }
            const document = await db.collection(collection).findOne(filter);
            if (document) {
                res.status(200).json(document);
            }
            else {
                res.status(404).json({ error: 'Documento no encontrado' });
            }
        }
        catch (err) {
            console.error('Error en la consulta:', err);
            res.status(500).json({ error: 'Error en la consulta de datos' });
        }
    }
    async updateOne(body, res) {
        const { collection, database, filter, update } = body;
        const db = this.connection.useDb(database);
        try {
            if (filter._id) {
                filter._id = new mongodb_1.ObjectId(filter._id);
            }
            const result = await db.collection(collection).updateOne(filter, update);
            if (result.matchedCount > 0) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({ error: 'Documento no encontrado' });
            }
        }
        catch (err) {
            console.error('Error en la actualización:', err);
            res.status(500).json({ error: 'Error en la actualización de datos' });
        }
    }
    async deleteOne(body, res) {
        const { collection, database, filter } = body;
        const db = this.connection.useDb(database);
        try {
            if (filter._id) {
                filter._id = new mongodb_1.ObjectId(filter._id);
            }
            const result = await db.collection(collection).deleteOne(filter);
            if (result.deletedCount > 0) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({ error: 'Documento no encontrado' });
            }
        }
        catch (err) {
            console.error('Error en la eliminación:', err);
            res.status(500).json({ error: 'Error en la eliminación de datos' });
        }
    }
    create(createJobDto) {
        return this.jobsService.create(createJobDto);
    }
    findAll() {
        return this.jobsService.findAll();
    }
    update(id, updateJobDto) {
        return this.jobsService.update(+id, updateJobDto);
    }
    remove(id) {
        return this.jobsService.remove(+id);
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, common_1.Post)('find'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_job_dto_1.FindJobDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "find", null);
__decorate([
    (0, common_1.Post)('insertOne'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "insertOne", null);
__decorate([
    (0, common_1.Post)('findOne'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_job_dto_1.FindJobDto, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('updateOne'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Post)('deleteOne'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_dto_1.CreateJobDto]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_dto_1.UpdateJobDto]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "remove", null);
exports.JobsController = JobsController = __decorate([
    (0, common_1.Controller)('api/action'),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [jobs_service_1.JobsService, mongoose_2.Connection])
], JobsController);
//# sourceMappingURL=jobs.controller.js.map