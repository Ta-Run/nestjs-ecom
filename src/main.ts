import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

declare const module: any;
async function bootstrap() {
    const app = await NestFactory.create(AppModule,{
        rawBody: true,
    });


    app.useLogger(new Logger())
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidateInputPipe());

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('Nest Js Product')
        .setDescription('API description and endpoints for your NestJS project')
        .setVersion('1.0')
        .addTag('auth')  
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);


    await app.listen(3000);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();