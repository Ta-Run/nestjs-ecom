import { Injectable, ArgumentMetadata, BadRequestException, ValidationPipe, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
   public async transform(value, metadata: ArgumentMetadata) {
      try {
         return await super.transform(value, metadata);
      } catch (e) {
         if (e instanceof BadRequestException) {
            const response = e.getResponse() as any;
            const validationErrors = response.message;
            throw new UnprocessableEntityException(this.handleError(validationErrors));
         }
      }
   }

   private handleError(errors) {
      console.log('errors',errors)
      return errors.map((error) => {
         if (typeof error === 'string') {
            return { error };
         }
         return {
            property: error.property,
            constraints: error.constraints,
         };
      });
   }

}