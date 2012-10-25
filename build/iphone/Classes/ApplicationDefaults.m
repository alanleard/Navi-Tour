/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"FMyqrwr0zCZNywC9fywHEFqr9cdy1YRV"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"4P0T96pyTvmkzmYC7lw6QFWfoIoU7TSt"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"2gsGtD6pw8KgPK1ihtH9CEpZyUbfHq0k"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"dRskCxxzXchhOEUw5tqlYGWHOVmUcEja"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"P13hYHGvPfSGgS6jspJzo5QBOtWV2qDf"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"jd4kuPVwGOy53HpNj7lNB9VFezh1hdoE"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
