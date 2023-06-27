import { Module } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    {provide: APP_INTERCEPTOR, useClass: LoggingInterceptor},
    {provide: APP_INTERCEPTOR, useClass: TransformInterceptor},
  ],
})
export class CoreModule {}
