import { NestedStack, NestedStackProps, RemovalPolicy } from "aws-cdk-lib";
import { Backend } from "../backend";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

export class WebHostingStack extends NestedStack {
  constructor(backend: Backend, id: string, props?: NestedStackProps) {
    super(backend.stack, id, props);
    const websiteBucket = new Bucket(this, "WebsiteBucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY, // Optional: Remove the bucket on stack deletion
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS_ONLY, // Allows public access but blocks ACLs
    });

    websiteBucket.policy?.document.addStatements(new PolicyStatement({}));
  }
}
