/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Assignments = "assignments",
	Classes = "classes",
	Submissions = "submissions",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AssignmentsRecord = {
	allow_submissions?: boolean
	class: RecordIdString
	name: string
}

export type ClassesRecord = {
	name: string
	owner: RecordIdString
	students?: RecordIdString[]
}

export type SubmissionsRecord = {
	assignment: RecordIdString
	file: string
	user: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AssignmentsResponse<Texpand = unknown> = Required<AssignmentsRecord> & BaseSystemFields<Texpand>
export type ClassesResponse<Texpand = unknown> = Required<ClassesRecord> & BaseSystemFields<Texpand>
export type SubmissionsResponse<Texpand = unknown> = Required<SubmissionsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	assignments: AssignmentsRecord
	classes: ClassesRecord
	submissions: SubmissionsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	assignments: AssignmentsResponse
	classes: ClassesResponse
	submissions: SubmissionsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'assignments'): RecordService<AssignmentsResponse>
	collection(idOrName: 'classes'): RecordService<ClassesResponse>
	collection(idOrName: 'submissions'): RecordService<SubmissionsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
