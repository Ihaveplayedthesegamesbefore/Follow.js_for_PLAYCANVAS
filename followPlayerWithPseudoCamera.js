var FollowPlayerWithPseudoCamera = pc.createScript('followPlayerWithPseudoCamera');

// Attributes
FollowPlayerWithPseudoCamera.attributes.add('player', {
    type: 'entity',
    description: 'The player entity to follow.'
});

FollowPlayerWithPseudoCamera.attributes.add('followSpeed', {
    type: 'number',
    default: 10,
    description: 'The speed at which the entity follows the player.'
});

FollowPlayerWithPseudoCamera.attributes.add('minDistance', {
    type: 'number',
    default: 2,
    description: 'The minimum distance to keep from the player.'
});

FollowPlayerWithPseudoCamera.attributes.add('childModel', {
    type: 'entity',
    description: 'The model or entity to parent to the pseudo-camera.'
});

// Attributes for customization
FollowPlayerWithPseudoCamera.attributes.add('modelScale', {
    type: 'vec3',
    default: [1, 1, 1],
    description: 'Adjust the scale of the child model (X, Y, Z).'
});

FollowPlayerWithPseudoCamera.attributes.add('modelRotation', {
    type: 'vec3',
    default: [0, 0, 0],
    description: 'Adjust the rotation of the child model (X, Y, Z degrees).'
});

FollowPlayerWithPseudoCamera.attributes.add('modelPositionOffset', {
    type: 'vec3',
    default: [0, 0, 0],
    description: 'Offset the position of the child model (X, Y, Z).'
});

// Initialize code called once per entity
FollowPlayerWithPseudoCamera.prototype.initialize = function () {
    if (!this.player) {
        console.error('FollowPlayerWithPseudoCamera: No player entity assigned. Please assign a player entity in the Inspector.');
        return;
    }

    // Create a smaller cube (pseudo-camera) as a child of this entity
    this.pseudoCamera = new pc.Entity('PseudoCamera');
    this.pseudoCamera.addComponent('model', {
        type: 'box'
    });
    this.pseudoCamera.setLocalScale(1, 1, 1);
    this.entity.addChild(this.pseudoCamera);

    // Position the pseudo-camera
    this.pseudoCamera.setLocalPosition(0, 0, 0);

    // If a child model is provided, parent it to the pseudo-camera
    if (this.childModel) {
        this.parentModelToPseudoCamera(this.childModel);
    }

    console.log('FollowPlayerWithPseudoCamera: Pseudo-camera created and attached.');
};

// Update code called every frame
FollowPlayerWithPseudoCamera.prototype.update = function (dt) {
    if (!this.player) {
        return; // Exit if no player is assigned
    }

    // Get the player's position
    var playerPosition = this.player.getPosition();

    // Get the current position of the pseudo-camera
    var pseudoCameraPosition = this.pseudoCamera.getPosition();

    // Ignore the Y-axis (vertical axis) for rotation
    var targetPosition = new pc.Vec3(playerPosition.x, pseudoCameraPosition.y, playerPosition.z);

    // Make the pseudo-camera face the player on the horizontal plane
    this.pseudoCamera.lookAt(targetPosition);

    // Get the current position of the entity
    var currentPosition = this.entity.getPosition();

    // Calculate the distance to the player
    var distance = currentPosition.distance(playerPosition);

    // Check if the entity is farther than the minimum distance
    if (distance > this.minDistance) {
        // Get the forward direction of the pseudo-camera
        var direction = this.pseudoCamera.forward.clone();

        // Move the entity toward the player using the pseudo-camera's forward direction
        var force = direction.scale(this.followSpeed);
        if (this.entity.rigidbody) {
            // Use physics-based movement
            this.entity.rigidbody.applyForce(force);
        } else {
            // Use kinematic movement as fallback
            this.entity.translate(force.scale(dt));
        }
    }
};

// Function to parent the child model to the pseudo-camera
FollowPlayerWithPseudoCamera.prototype.parentModelToPseudoCamera = function (model) {
    if (model) {
        // Parent the model to the pseudo-camera
        this.pseudoCamera.addChild(model);

        // Reset the model's local position
        model.setLocalPosition(this.modelPositionOffset.x, this.modelPositionOffset.y, this.modelPositionOffset.z);

        // Apply the model's scale
        model.setLocalScale(this.modelScale.x, this.modelScale.y, this.modelScale.z);

        // Apply the model's rotation
        model.setLocalEulerAngles(this.modelRotation.x, this.modelRotation.y, this.modelRotation.z);

        // Hide the pseudo-camera (make it non-rendered)
        if (this.pseudoCamera.model) {
            this.pseudoCamera.model.enabled = false;
        }

        console.log('FollowPlayerWithPseudoCamera: Child model parented to the pseudo-camera with custom transformations.');
    } else {
        console.warn('FollowPlayerWithPseudoCamera: No model provided to parent.');
    }
};
