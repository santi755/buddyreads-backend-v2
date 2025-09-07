CREATE TABLE "identities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"email" varchar(255) NOT NULL,
	"provider" varchar(50) NOT NULL,
	"provider_id" varchar(255),
	"password" text,
	"is_verified" boolean DEFAULT false NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"last_used_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "identities_email_provider_unique" UNIQUE("email","provider"),
	CONSTRAINT "identities_user_provider_unique" UNIQUE("user_id","provider")
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" varchar(255) NOT NULL,
	"device" varchar(255) NOT NULL,
	"ip" varchar(45) NOT NULL,
	"user_agent" text,
	"expires_at" timestamp NOT NULL,
	"revoked_at" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "refresh_tokens_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"avatar" text,
	"primary_email" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_email_verified" boolean DEFAULT false NOT NULL,
	"last_login_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_primary_email_unique" UNIQUE("primary_email")
);
--> statement-breakpoint
ALTER TABLE "identities" ADD CONSTRAINT "identities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "identities_user_id_idx" ON "identities" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "identities_email_idx" ON "identities" USING btree ("email");--> statement-breakpoint
CREATE INDEX "identities_provider_idx" ON "identities" USING btree ("provider");--> statement-breakpoint
CREATE INDEX "identities_provider_id_idx" ON "identities" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "users_primary_email_idx" ON "users" USING btree ("primary_email");--> statement-breakpoint
CREATE INDEX "users_is_active_idx" ON "users" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "users_last_login_at_idx" ON "users" USING btree ("last_login_at");