import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentCategory } from './entities/document-category.entity';
import { DocumentTag } from './entities/document-tag.entity';
import { DocumentType } from './entities/document-type.entity';
import { Document } from './entities/document.entity';
import { DocumentVersion } from './entities/document-version.entity';
import { DocumentComment } from './entities/document-comment.entity';
import { DocumentShare } from './entities/document-share.entity';
import { DocumentTemplate } from './entities/document-template.entity';
import { DocumentWorkflow } from './entities/document-workflow.entity';
import { DocumentWorkflowStep } from './entities/document-workflow-step.entity';
import { DocumentWorkflowInstance } from './entities/document-workflow-instance.entity';
import { DocumentWorkflowStepInstance } from './entities/document-workflow-step-instance.entity';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentCategory,
      DocumentTag,
      DocumentType,
      Document,
      DocumentVersion,
      DocumentComment,
      DocumentShare,
      DocumentTemplate,
      DocumentWorkflow,
      DocumentWorkflowStep,
      DocumentWorkflowInstance,
      DocumentWorkflowStepInstance,
    ]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
